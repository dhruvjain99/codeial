class chatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000/');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log('Connection established successfully!');

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chat_room: 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log('New user joined!', data);

            });

            $("#send-chat-button").on('click', function(){
                let msg = $("#chat-message-form").val();

                if(msg != ''){
                    self.socket.emit('send_message', {
                        message: msg,
                        user_email: self.userEmail,
                        chat_room: 'codeial'
                    });
                }
            });

            self.socket.on('receive_message', function(data){
                console.log('Message Received!', data);

                let newMessage = $('<li>');
                let messageType = 'received-messages';

                if(data.user_email == self.userEmail){
                    messageType = 'sent-messages';
                }

                newMessage.append($('<span>').html(data.message));
                newMessage.append($('<sub>').html(data.user_email));
                newMessage.addClass(messageType);

                $('#messages-list').append(newMessage);
            });
        });
    }

}