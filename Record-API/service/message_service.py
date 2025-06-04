from model.message_model import save_message_to_db, get_messages_by_sender

class MessageService:
    def __init__(self):
        pass

    def send_message(self, message, sender_id, receiver_id):
        save_message_to_db(message, sender_id, receiver_id)
        return True

    def get_messages_from_sender(self, sender_id):
        return get_messages_by_sender(sender_id)
