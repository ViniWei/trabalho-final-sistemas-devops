from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.String(80), nullable=False)
    receiver = db.Column(db.String(80), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='unread')

    def to_dict(self):
        return {
            'id': self.id,
            'sender': self.sender,
            'receiver': self.receiver,
            'content': self.content,
            'timestamp': self.timestamp.isoformat(),
            'status': self.status
        }
