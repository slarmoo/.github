import React from 'react';
import ReactDOM from 'react-dom/client';

class ChatClient {

    constructor() {
      // Adjust the webSocket protocol to what is being used for HTTP
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
      // Display that we have opened the webSocket
      this.socket.onopen = (event) => {
        this.appendMsg('system', 'websocket', 'connected');
      };
      // Display messages we receive from our friends
      this.socket.onmessage = async (event) => {
        const text = await event.data.text();
        const chat = JSON.parse(text);
        this.appendMsg('friend', chat.name, chat.msg);
      };
      // If the webSocket is closed then disable the interface
      this.socket.onclose = (event) => {
        this.appendMsg('system', 'websocket', 'disconnected');
        document.querySelector('#name-controls').disabled = true;
        document.querySelector('#chat-controls').disabled = true;
      };
    }
  
    // Send a message over the webSocket
    sendMessage(name, msg) {
      this.appendMsg('me', 'me', msg);
      this.socket.send(`{"name":"${name}", "msg":"${msg}"}`);
      document.querySelector('#new-msg').value='';
    }
  
    // Create one long list of messages
    appendMsg(cls, from, msg) {
      const chatText = document.querySelector('#chat-text');
      const chatEl = document.createElement('div');
      chatEl.innerHTML = `<span class="${cls}">${from}</span>: ${msg}</div>`;
      chatText.prepend(chatEl);
    }
  }
  
  const Chatter = new ChatClient();



function Chat() {
  const [name, setName] = React.useState('');

  return (
    <main>
      <Name updateName={setName} />
      <Message disabled={name === ''} name={name} client={Chatter} />
      <Messages />
    </main>
  );
}

function Name({ updateName }) {
  return (
    <main>
      <div className='name'>
        <fieldset id='name-controls'>
          <legend>My Name</legend>
          <input
            onChange={(e) => updateName(e.target.value)}
            id='my-name'
            type='text'
          />
        </fieldset>
      </div>
    </main>
  );
}

function Message({ disabled, name, client }) {
  function doneMessage(e) {
    if (e.key === 'Enter') {
      sendMsg();
    }
  }

  function sendMsg() {
    client.sendMessage(name, document.querySelector('#new-msg').value);
  }

  return (
    <main>
      {disabled && (
        <fieldset id='chat-controls' disabled>
          <legend>Chat</legend>
          <input id='new-msg' type='text' />
          <button>Send</button>
        </fieldset>
      )}
      {!disabled && (
        <fieldset id='chat-controls'>
          <legend>Chat</legend>
          <input onKeyUp={(e) => doneMessage(e)} id='new-msg' type='text' />
          <button onClick={sendMsg}>Send</button>
        </fieldset>
      )}
    </main>
  );
}

function Messages() {
    return (
      <main>
          <div id="chat-text"></div>
      </main>
    );
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Chat />);
