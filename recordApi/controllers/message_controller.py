from flask import Blueprint, request, jsonify
from app.services.message_service import store_message, get_messages
from app.utils.logger import logger

message_bp = Blueprint('messages', __name__)

@message_bp.route('/messages', methods=['POST'])
def post_message():
    try:
        data = request.get_json()
        if not all(k in data for k in ['sender', 'receiver', 'content']):
            return jsonify({'error': 'Missing required fields'}), 400
        
        result = store_message(data)
        return jsonify(result), 201
    except Exception as e:
        logger.error(f"Error storing message: {str(e)}")
        return jsonify({'error': 'Internal error'}), 500

@message_bp.route('/messages', methods=['GET'])
def get_all_messages():
    try:
        messages, source = get_messages()
        return jsonify({'messages': messages, 'source': source}), 200
    except Exception as e:
        logger.error(f"Error retrieving messages: {str(e)}")
        return jsonify({'error': 'Failed to retrieve messages'}), 500
