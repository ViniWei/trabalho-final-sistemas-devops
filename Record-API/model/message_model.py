import mysql.connector
from config import MYSQL_CONFIG

def get_db_connection():
    return mysql.connector.connect(**MYSQL_CONFIG)

def save_message_to_db(message, sender_id, receiver_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "INSERT INTO messages (message, sender_id, receiver_id) VALUES (%s, %s, %s)"
    cursor.execute(query, (message, sender_id, receiver_id))
    conn.commit()
    cursor.close()
    conn.close()

def get_messages_by_sender(sender_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = "SELECT * FROM messages WHERE sender_id = %s"
    cursor.execute(query, (sender_id,))
    messages = cursor.fetchall()

    cursor.close()
    conn.close()

    return messages
