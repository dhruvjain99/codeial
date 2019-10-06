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
        });
    }

}