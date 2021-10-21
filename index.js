const fs = require('fs');
var parse = require('csv-parser');
var readline = require('readline'), menu;
let entries = [];

// Copied from Stackoverflow
/*
*   Read CSV 
*/

function readCSV() {    
    let count = 0;
    fs.createReadStream('./data/employees.csv')
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', function (row) {
            count++;
            if(row.id>0){
                entries.push(new Employee(row));
            }
        })
        .on('end', function () {
           
        });
}

class Employee {
    constructor(row) {
        this.id = row.id;
        this.first_name = row.first_name;
        this.last_name = row.last_name;
        this.date_of_birth = row.date_of_birth;
        this.employee_number = row.employee_number;
        this.salary = row.salary;
        this.role_designation = row.role_designation;
        this.reports_to = row.reports_to;
    }
}

readCSV();

function menuHeading()
{
    // Clear screen
    process.stdout.write('\033c');

    // Log the menu
    console.log(
        '\t**************************\n'+
        '\t**    Employee menu     **\n' +
        '\t**************************\n\n'+
        ' 1 = List All\n' +
        ' 2 = Search By Name\n' +
        ' 3 = Search By Date of Birth\n' +
        ' 4 = Salary Structure\n' +
        ' 5 = Organizational Structure\n' +
        ' 9 = Help\n'+
        ' 0 = Exit'
        );
}
// Main
function showMain() {
    menuHeading();
    optionsMenu();
}

function Employees(row)
{
    return {id: row.id, first_name:row.first_name};
}

function optionsMenu()
{
    console.log('\n');
    // Check if there is already a menu active. If true, close it.
    if(menu) menu.close();

    //Creates a readline Interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Ask question
    menu.question('Option: ', function(input) {
        let res = input.split(' ');
    
        switch(res[0]) {
            case '1': listAll(); break;
            case '2': searchByName(res[1]); break;
            case '3': searchByDate(res[1]); break;
            case '4': searchBySalary(); break;
            case '5': orginizationStructure(); break;
            case '9': showHelp(); break;
            case '0': console.log('Thank you for using our system!');process.exit(); break;
            default: showMain() /* show menu again if input does not match */;
        }
    });

}

// List All Employees
function listAll()
{
  showMain();
    console.log('\n');
    console.log('*** All Entries\n');
    console.table(entries);
    optionsMenu();
}

// Search By Name
function searchByName(first_name){
    showMain();
    console.log('\n');
    console.log('*** Search By Name ('+first_name+')\n');
    var by_name = entries.find(function(post, index) {
        if(post.first_name == first_name)
            return true;
    });
    console.table(by_name);
    optionsMenu();
}

// Search By Name
function searchByDate(date){
    showMain();
    console.log('\n');
    console.log('*** Search By Date of Birth ('+date+')\n');
    var by_date = entries.find(function(post, index) {
        if(post.date_of_birth == date)
            return true;
    });
    console.table(by_date);
    optionsMenu();
}

function searchBySalary()
{
    showMain();
    console.log('\n');
    
    let objs = entries;
    let salaries = [];
    console.log('\t*** Salary Structure\n');    
    objs.sort((a, b) => parseFloat(a.salary) - parseFloat(b.salary));
    console.table(objs);
    console.log('\t*** The highest earning member on each tier level is\n');
    var non_duplidated_data = removeDuplicates(objs, "role_designation");
    let salary = 0;
    non_duplidated_data.forEach(object=>{
        salary = object.salary.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        console.log(`\t${object.role_designation}: ${object.first_name} ${object.last_name}\t- R ${salary}\n`);
    })
    optionsMenu();
}

function orginizationStructure()
{
    console.log('\t*** Organizational Structure\n'); 
    let org = entries;
    let structure = [];
    org.sort((a,b) => parseFloat(a.reports_to) - parseFloat(b.reports_to));

    org.forEach(object => {
        if(parseFloat(object.reports_to)===0)
        {
            console.log(`\t${object.first_name} ${object.last_name} (${object.role_designation})\n`);
            org.forEach(sub1 => {
                if(object.id === sub1.reports_to)
                {
                    console.log(`\t-->${sub1.first_name} ${sub1.last_name} (${sub1.role_designation})\n`);
                    org.forEach(sub2 => {
                        if(sub1.id===sub2.reports_to){
                            console.log(`\t\t-->${sub2.first_name} ${sub2.last_name} (${sub2.role_designation})\n`);
                            org.forEach(sub3 => {
                                if(sub2.id === sub3.reports_to)
                                {
                                    console.log(`\t\t\t-->${sub3.first_name} ${sub3.last_name} (${sub3.role_designation})\n`);
                                }
                            });
                        }
                    })
                }
            })
        }
  
    });
    
    optionsMenu();
}

// Copied from Stackoverflow
function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    // reverse 
    newArray.sort((a, b) => parseFloat(b.salary) - parseFloat(a.salary));
    return newArray;
}

function showHelp()
{
    // Clear screen
    process.stdout.write('\033c');
    console.log(
        '\t**********************\n'+
        '\t**      Help        **\n' +
        '\t**********************\n'+
        '\tSearch By Name\n' +
        '\tEnter 2 followed by a space and the name of the person\n'+
        '\teg: 2 Carol\n\n'+
        '\tSearch By Date of Birth\n' +
        '\tEnter 3 followed by a space and the date of birth\n'+
        '\teg: 3 30-10-2008\n\n'
        );
        menu.question('> ', function(input) {
            switch(input) {
                default: showMain();
            }
        });
}
showMain();