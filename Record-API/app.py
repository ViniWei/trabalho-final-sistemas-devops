from flask import Flask, request, jsonify
from service.message_service import MessageService
from cache.redis_cache import cache_message, get_cached_message
import hashlib
from datetime import datetime

app = Flask(__name__)
service = MessageService()

@app.route("/message", methods=["POST"])
def post_message():
    data = request.get_json()

    key = hashlib.sha256(f"{data['message']}_{data['userIdSend']}_{data['userIdReceive']}".encode()).hexdigest()

    if get_cached_message(key):
        return jsonify({"ok": True, "cached": True})

    service.send_message(
        message=data['message'],
        sender_id=data['userIdSend'],
        receiver_id=data['userIdReceive']
    )

    cache_message(key, {"ok": True})
    return jsonify({"ok": True, "cached": False})

@app.route("/messages/<int:sender_id>", methods=["GET"])
def get_messages(sender_id):
    key = f"messages:{sender_id}"
    cached = get_cached_message(key)
    if cached:
        return jsonify(cached)

    messages = service.get_messages_from_sender(sender_id)
    messages = serialize_messages(messages)

    cache_message(key, messages)
    return jsonify(messages)

def serialize_messages(messages):
    for msg in messages:
        for key, value in msg.items():
            if isinstance(value, datetime):
                msg[key] = value.isoformat()
    return messages




if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
