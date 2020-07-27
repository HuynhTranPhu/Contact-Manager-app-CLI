/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
var readlineSync = require('readline-sync');
var fs =require('fs');
var contacts = [];
function loadData(){
  var content = fs.readFileSync('./data.json');
  contacts = JSON.parse(content)
}
function showAllContacts(contacts){
  for(var contact of contacts){
      console.log(contact.id, contact.name, contact.phonenumber);
  }
}
function showCreateContact(){
  var id = readlineSync.question('id ');
  var name = readlineSync.question('Name ');
  var phonenumber = readlineSync.question('Phonenumber ');
  var contact={
    id: id,
    name: name,
    phonenumber:parseInt(phonenumber)
  };
  contacts.push(contact)
}
function showEditContact(){
  var idEdit=readlineSync.question('nhập id cần sửa phone:');
  idEdit=parseInt(idEdit);
  for(var i=0;i<contacts.length;i++)
  {
    if(contacts[i].id==idEdit)
    {
      var phoneNew=readlineSync.question('nhập phone mới:');
      contacts[i].phonenumber=parseInt(phoneNew);
      saveContact();
      break;
    }
  }
}
function showDeleteContact(){
  var idDelete=readlineSync.question('nhập id cần xóa:');
  idDelete=parseInt(idDelete);
  for(var i=0;i<contacts.length;i++)
  {
    if(contacts[i].id==idDelete)
    {
     // delete contacts[i];
     contacts.splice(i,1);
      saveContact();
      break;
    }
  }
}
function showFindContact(arr){
  var kq=[];
  var temp=readlineSync.question('nhập thông tin muốn tìm:');
  if(!isNaN(temp)){
     temp = Number(temp);
     
     for(x of arr){
       if(Number(x.phonenumber).toString().indexOf(Number(temp).toString())>=0){
         
          kq.push(x);
          
       }
     }
     showAllContacts(kq);
  }else{
    temp = temp.toString();
    for(x of arr){
      if(x.name.toLowerCase().indexOf(temp.toLowerCase())>=0){
         kq.push(x);
      }
    }
    showAllContacts(kq);
  }
}
function saveContact(){
  var content = JSON.stringify(contacts);
  fs.writeFileSync('./data.json', content, {encoding:'utf8'});
}

function showMenu(){
  console.log('0. Show all contact');
  console.log('1. Create contact');
  console.log('2. Edit contact');
  console.log('3. Delete contact');
  console.log('4. find a contact');
  console.log('5. Save contact');
  var option = readlineSync.question('> ');
  switch(option){
    case '0':
      showAllContacts(contacts);
      showMenu()
      break;
    case '1':
      showCreateContact();
      showMenu()
      break;
    case '2':
      showEditContact();
      showMenu();
      break;
    case '3':
      showDeleteContact();
      showMenu();
      break;
    case '4':
      showFindContact(contacts);
      showMenu();
      break;
    case '5':
      saveContact();
      showMenu();
      break;
    default:
      console.log("wrong option");
      showMenu();
      break;
  }
}

function main(){
  loadData();
  showMenu();
}
main();