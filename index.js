import bcrypt from 'bcrypt';
// await bcrypt.compare(password, hash);
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        console.log(myPlaintextPassword);
        
        // Store hash in your password DB.
    });
});
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
// });
async function checkUser(username, password) {
    //... fetch user from a db etc.

    const match = await bcrypt.compare(password, user.passwordHash);

    if(match) {
        //login
    }

    //...
}







export async function hashPassword(pliainPassword , saltRound = 10){
    const hashPassword = await bcrypt.hash(pliainPassword,saltRound)
    return hashPassword
}



export async function verifyPassword(pliainPassword,hashPassword) {
    
   const match = await bcrypt.compare(pliainPassword,hashPassword)
   return match
}
console.log(await hashPassword('1234'));

// console.log(await verifyPassword('1234',$2b$10$sjOCdO6ZiTfi6AHER2smJequbBjI0GdYWsMj4Dp/PXyng5G59vk/y));
















