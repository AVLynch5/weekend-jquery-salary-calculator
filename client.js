let employeeArray = [];//empty array to store employee objects

$(document).ready(function() {
    //console.log('Hello World!');//test to see if scripts sourced properly

    addToDOM();//initally runs function while employeeArray is empty to append monthlyTotal = 0 to the DOM

    $('#submit-button').on('click', function() {//ghost function - on click, two functions are called
        newEmployeeObject();//retrieves inputted employee info and stores it as an object in employeeArray
        addToDOM();//clears the displayed table, appends all employee info stored in employeeArray to the displayed table, and calls calcMonthSal to calculate and display the monthly costs
    });

    $('#employee-table-body').on('click', '.delete-button', removeEmployee);//event delegation - when document is ready, .delete-button elements do not yet exist
    
});

function newEmployeeObject() {
    let firstName = $('#first-name').val();
    let lastName = $('#last-name').val();
    let idNum = $('#id-num').val();
    let jobTitle = $('#job-title').val();
    let annualSal = $('#annual-salary').val();
    if (!firstName || !lastName || !idNum || !jobTitle || !annualSal) {
        alert('Please input all employee information');
        return;//check to ensure all input fields filled in
    }
    if (annualSal < 0) {
        alert('Annual Salary must be a positive number');//check to make sure annual salary field given a positive value
        return;
    }
    let newObject = {
        First: firstName,
        Last: lastName,
        ID: idNum,
        Title: jobTitle,
        Salary: annualSal
    };
    employeeArray.push(newObject);//adds new employee object to the employeeArray
    $('#first-name').val('');//clears input fields
    $('#last-name').val('');
    $('#id-num').val('');
    $('#job-title').val('');
    $('#annual-salary').val('');
    //console.log(newObject, employeeArray);//test to see if newObject created and added to array. Note - all values entered as strings
}//end newEmployeeObject

function calcMonthlySal() {
    let annualTotal = 0;
    for (let employee of employeeArray) {//sums all employee annual salary info stored in the employeeArray
        annualTotal += parseInt(employee.Salary);//employee.Salary stored as a string, must convert to num to avoid concat
    }
    //console.log(annualTotal);//test to make sure summing not concat
    let realmonthlyTotal = annualTotal/12;
    let monthlyTotal = realmonthlyTotal.toFixed(2);//to round number value to 2 decimal places
    //console.log(monthlyTotal);//test to make sure number value calculated
    return monthlyTotal;
}//end calcMonthlySal

function addToDOM() {
    $('#employee-table-body').empty();//clears the table displayed on the DOM
    for (let employee of employeeArray) {//for each employee object stored in employeeArray, create new table row with stored object info and delete button
        $('#employee-table-body').append(`
            <tr>
                <td>${employee.First}</td>
                <td>${employee.Last}</td>
                <td>${employee.ID}</td>
                <td>${employee.Title}</td>
                <td>$${employee.Salary}</td>
                <td><button class="delete-button" id="${employee.ID}">Delete</button></td>
            </tr>
        `);
    }
    $('#monthly-total').empty();//clears monthly total field
    let monthlyCost = calcMonthlySal();
    if (monthlyCost > 20000) {
        spanColor = 'red';
    } else if (monthlyCost <= 20000) {
        spanColor = 'green';
    }//value check to determine background color of monthly total field
    $('#monthly-total').append(`<h3>Monthly Total: $<span class="${spanColor}" id="salary-month-total"></span></h3>`);//re-appends h3 and span with span class equal to the appropriate span background color
    $('#salary-month-total').append(`${monthlyCost}`);//re-appends monthly cost value to the span element. Could accomplish this append in same line as line 80 (prev) using ${monthlyCost}
}//end addToDOM

function removeEmployee() {
    //console.log($(this));//to determine $(this) - it's the clicked delete button
    let targetID = $(this).attr('id');
    //console.log(target);//test to make sure targetID is the click button's id number (as a string)
    //let rowToDelete = $(this).parent().parent(); - instead of creating object array and clearing/re-appending table with each object addition/deletion, I could use this to delete the row/<tr>. AKA, streamline function calls and cut down on need for loops.
    for (let employee of employeeArray) {
        if (employee.ID === targetID) {
            objectIndexToDelete = employeeArray.indexOf(employee);//gets most up to data index of the employee object in employeeArray.
        }
    }
    employeeArray.splice(objectIndexToDelete, 1);//removes employee object from employeeArray
    addToDOM();
}//end removeEmployee



/**
 * The plan - Basic, w/o checks:
 * To make tracking monthly salary easier, will store employees+data as objects in array (instead of a count/tally)
 * Step1: create empty array
 * step2: create onclick function - clicking submit button triggers ghost function.
 * step3: define funct1 - takes no param. Declare var for each input field. Declare newObject with properties. Store input data in newObject. Push newObject to array. Clear input fields. Option - return newObject
 * step4: define funct2 - takes no param. Declare annualTotal var. For loop to sum annual salaries in array of objects. MAKE SURE SUMMIMNG NOT CONCAT. Declare var monthlyTotal = annualTotal/12. return monthlyTotal
 * step5: define funct3 - appends data to the DOM. If funct3 takes newObject as input, it can easily add new row to table and update monthly total span on click. HOWEVER, how to delete the row (figured out).
 *      **funct 3 - takes monthlyTotal as input (maybe). First, clears #employee-table-body. for loop - for each object in array, appends row with required data to #employee-table-body. Appends monthlyTotal to span element and performs check. If <= 20K, green color class. If >20K, red color class.
 *      **Color change won't work - will likely need to clear div at beginning of funct3 and append h3 with text, span with class green/red, and monthlyTotal
 *      **Edit - no need to run calcMonthlySal prior to addToDOM or have addToDOM take it as input param - can just call calcMonthlySal in addToDOM
 * Step6: Row delete buttons
 *      **idea - give each delete button id == employee object id for easy targeting in array & deletion
 * Step7: create onclick function for row delete buttons - 3 param
 * Step8: define funct4 - clicking row delete button removes that employee from the array. Follow up with funct2 to recalculate monthlyTotal and funct3 to update the DOM
 */