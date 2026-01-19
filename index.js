import promptModule from "prompt-sync";
import bcrypt from 'bcrypt'
import { MongoClient } from "mongodb";

// Mongoclient serve para configurar uma conexão do servidor com o banco de dados, ele usa o dbUrl para saber onde está o servidor do banco de dados, que no nosso caso, está rodando localmente em nossa máquina
const dbUrl = "mongodb://localhost:27017";
const client = new MongoClient(dbUrl) // criando um cliente (banco de dados) para o meu servidor
let hasPasswords = false // irá indicar se existe uma senha mestre
let passwordsCollection, authCollection // serão as coleções que eu terei no banco de dados 
const dbName = "passwordManager" // define o nome do banco de dados


// função main para inicializar o banco de dados 

const main = async () => {
    try {
        await client.connect(); // tenta se conectar ao servidor mongoDB
        console.log("Connected sucessfully to server")
        const db = client.db(dbName) // conectará/criará um banco de dados com o nome de dbName
        authCollection = db.collection("auth") // adiciona a coleção auth, que armazenará o hash da senha mestre
        passwordsCollection = db.collection("passwords") // adiciona a coleção passwords, que armazenará as senhas 
        const hashedPassword = await authCollection.findOne({type: "auth"}) // para conseguir entrar, procurará o hash da senha mestre na coleção auth
        hasPasswords = !!hashedPassword // atribui e transforma o resultado da pesquisa de hashedPassword em um valor booleano, true se achar, false se nao achar
    } catch (error) {
        console.log("Error connectind to database: ", error)
        process.exit(1)
    }
}

const prompt = promptModule() // configura o prompt para usar async e await

// criptografar e salvar no banco de dados a senha
const saveNewPassword = async (password) =>{
    const hash = bcrypt.hashSync(password, 10) // esse 10 é o numero de 'rounds de criptografia'
    await authCollection.insertOne({"type": "auth", hash}) // insere à coleção auth do banco de dados  o hash da senha mestre salva
    console.log('Password saved') // notificar o usuário que a senha foi salva 
    showMenu() // abrir o menu de ações
};

// comparar uma senha recebida com a senha armazenada no banco de dados 
const compareHashedPassword = async (password) => {
    const {hash} = await authCollection.findOne({"type": "auth"}) // pesquisa por um hash (tipo auth) na coleção auth
    return await bcrypt.compare(password, hash)
};

// digitar uma nova senha mestre
const promptNewPassword = () =>{
    const response = prompt("Enter a main password: ")
    saveNewPassword(response)
};

// comparar uma senha mestre digitada com a senha mestre atual 
const promptOldPassword = async ()=>{
    let verified = false; // flag para fazer o controle do laço de repetição de verificação
    while(!verified){
        const response = prompt("Enter new password: ")
        // verificar a senha digitada com a existente utilizando compareHashedPassword
        const result = await compareHashedPassword(response)
        if(result){ // caso as senhas sejam iguais, abrir o Menu e interromper o laço 
            console.log('Acess allowed')
            verified = true
            showMenu()
        }else{ // caso as senhas sejam diferentes, notificar o usuário e o laço de verificação continua
            console.log('Password incorrect! Try again')
        }
    }
};

// ver as senhas salvas no 'banco de dados' 
const viewPasswords = async ()=>{
    const passwords = await passwordsCollection.find({}).toArray(); // pesquisa objetos na coleção passwords e transforma essa coleção em um array local 
    passwords.forEach(({source, password}, index)=> {
        console.log(`${index+1}. ${source} => ${password}`)
    });
    showMenu()
};

// função para adicionar uma nova senha ao 'banco de dados'
const promptManageNewPassword = async ()=>{
    const source = prompt('Enter name for password: ')
    const password = prompt('Enter password to save: ')
    await passwordsCollection.findOneAndUpdate( // serve para encontrar um valor em uma coleção e/ou alterá-lo/criá-lo
        {source}, // filtro: quem será atualizado
        {$set:{password}}, // set: define ou sobrescreve um campo (passwords nesse caso)
        {
            returnDocument: "after", // retorna o documento após a atualização
            upsert: true, // se nao existir, cria a instancia buscada, se existir, atualiza
        }

    )
    console.log(`Password for ${source} has been saved`)
    showMenu()
};



// criando o menu de opções com a função showMenu()
const showMenu = async ()=>{
    console.log(`
        1. View passwords 
        2. Manage new password
        3. Verify password
        4. exit`);
    const response = prompt(">")
    let CastedResponse = Number(response)
    switch(CastedResponse){
        case 1:
            await viewPasswords();
            break;
        case 2:
            await promptManageNewPassword();
            break;
        case 3:
           await promptOldPassword();
            break;
        case 4:
            process.exit();
            break;
        default:
            console.log("That's an invalind response. ")
            await showMenu();
            break;
    }
};


// configura a conexão com o banco de dados, pede para digitir uma nova senha mestre se nenhuma existir na coleção auth ou digitar a senha mestre existente para iniciar a aplicação
const initialize = async ()=>{
    await main();
    if(!hasPasswords) promptNewPassword();
    else promptOldPassword()
};

initialize()
