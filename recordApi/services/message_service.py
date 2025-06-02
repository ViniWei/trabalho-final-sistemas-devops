from app.models.message_model import db, Message
from app.utils.redis_client import redis_client

def store_message(data):
    new_message = Message(
        sender=data['sender'],
        receiver=data['receiver'],
        content=data['content'],
        status='unread'
    )
    db.session.add(new_message)
    db.session.commit()

    redis_key = f"message:{new_message.id}"
    redis_client.hmset(redis_key, new_message.to_dict())
    redis_client.publish('new_messages', str(new_message.id))
    return new_message.to_dict()

def get_messages():
    cached_messages = []
    for key in redis_client.scan_iter("message:*"):
        cached_msg = {k.decode(): v.decode() for k, v in redis_client.hgetall(key).items()}
        cached_messages.append(cached_msg)

    if cached_messages:
        return cached_messages, 'cache'

    messages = Message.query.order_by(Message.timestamp.desc()).limit(100).all()
    result = [msg.to_dict() for msg in messages]

    for msg in messages:
        redis_key = f"message:{msg.id}"
        redis_client.hmset(redis_key, msg.to_dict())

    return result, 'database'
