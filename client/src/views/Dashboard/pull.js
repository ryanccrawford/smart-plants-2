import { PubSub } from '@google-cloud/pubsub';


export default class subsribeNow {
// Imports the Google Cloud client library
    constructor(messageCB) {
        
        this.pubsub = new PubSub();
        this.projectName = 'smart-plants-2';
        this.subscriptionName = 'live';
        this.caller = messageCB;
        this.subscription = this.pubsub.subscription(this.subscriptionName);
       
    }

    start = () => {
        
        this.subscription.on(`message`, this.messageHandler);

    }
messageHandler = message => {
    this.caller(message); //remmember to call  message.ack();
   
};

// Listen for new messages until timeout is hit


stoprListening = () => {
    this.subscription.removeListener('message', this.messageHandler);
    
    }

}
