//Phone Queue System

//phrases courtesy of: https://inperium.com/blog/the-best-audio-prompts-and-hold-messages-for-call-queues/

var queueSystem = []; //global variable
var phoneNumber = "416-112-2234"; //this will act as the user's phone number

function greeting(){
    console.log("Thanks for calling. Please stay on the line. Your call is being connected to one of our agents.\n");
}

function removeCustomer(){
    queueSystem.shift(); //removes the first position from the queue system
    return queueSystem;
}

function addCustomer(customer){
    queueSystem.push(customer); //appends any customer that gets added to the queue system once validated
    return queueSystem;
}

function validatePhoneNumber(phoneNumber){

    console.log("Connecting..."); 
    console.log("Validating phone number...\n");

    //Turning the phone number string into integers
    let parse = phoneNumber.split(/-/); //seperates any phone number given

    //Storing the parts of a phone number to seperate variables to validate them under conditions.
    let areaCode = parseInt(parse[0]); /
    let prefix = parseInt(parse[1]);
    let local = parseInt(parse[2]);

    //Checks if the area code is 416. 
    if(areaCode !== 416){
        throw new Error("Invalid area code. Valid area codes: 416");
    }

    //Checks if the prefix (middle part of a phone number) is in between 3 digits
    if(prefix < 100 || prefix > 999){
        throw new Error("Invalid prefix. Must be between 100-999");
    }

    //Checks if the local (end part of a phone number) is in between 4 digits.
    if(local < 1000 || local > 9999){
        throw new Error("Invalid local number. Must be between 1000-9999");
    }

    //Returns a string of the phone number if it's validated.
    return `${areaCode}-${prefix}-${local}`;

}

function queuePosition(customer){

    for(let i = 0; i < queueSystem.length; i++){

        //Checks if a customer has the first position.
        if(queueSystem[0] === customer){
            console.log(`Hello, phone number: ${customer}. As the first position, you now will be removed from the queue to see an agent.\n`);
            removeCustomer();
        }
        //If the customer is not in the first positon, a message will be sent to inform them of their current position.
        else if(queueSystem[i] === customer){
            let userPosition = i + 1;
            console.log(`You are currently in positon: ${userPosition}.`);
            console.log("Your call will be answered in the order it was received, please continue to hold.\n");
        }
    }
}

//Program Demonstration

//Adding some customers to the queue to simulate an actual call.
addCustomer('416-100-1000');
addCustomer('416-200-2000');

/*Validating Phone Number
  This simulates what happens when a phone calls another user. Here, I am checking if the phone number passed as an argument is a valid phone number.
*/
validatePhoneNumber(phoneNumber);
//Greets the user if their phone number is valid.
greeting();

//Adding the user to the queue.
addCustomer(phoneNumber);

//Showing the users current positon. In this case it's position 3 since they have been added after two phone numbers.
queuePosition(phoneNumber);

// Finds the the caller in the first position and removes them. The user will now be in position 2.
queuePosition('416-100-1000');

//Shows the users current position. If they are in the first position of the queue, they will be removed. If they are not, they will be told their position.
queuePosition(phoneNumber);
