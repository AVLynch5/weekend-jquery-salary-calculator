let employeeArray = [];

$(document).ready(function() {
    //console.log('Hello World!');//test to see if scripts sourced properly

    $('#submit-button').on('click', function() {
        newEmployeeObject();
        addToDOM();
    });

    $('#employee-table-body').on('click', '.delete-button', function() {
        //console.log('Deleted');//test to make sure employee delete buttons work
        //call removeEmployee();
    });
});

function newEmployeeObject() {
    let firstName = $('#first-name').val();
    let lastName = $('#last-name').val();
    let idNum = $('#id-num').val();
    let jobTitle = $('#job-title').val();
    let annualSal = $('#annual-salary').val();
    let newObject = {
        First: firstName,
        Last: lastName,
        ID: idNum,
        Title: jobTitle,
        Salary: annualSal
    };
    employeeArray.push(newObject);
    $('#first-name').val('');
    $('#last-name').val('');
    $('#id-num').val('');
    $('#job-title').val('');
    $('#annual-salary').val('');
    console.log(newObject, employeeArray);//test to see if newObject created and added to array. Note - all values entered as strings
}//end newEmployeeObject

function calcMonthlySal() {
    let annualTotal = 0;
    for (let employee of employeeArray) {
        annualTotal += parseInt(employee.Salary);//employee.Salary stored as a string, must convert to num to avoid concat
    }
    //console.log(annualTotal);//test to make sure summing not concat
    monthlyTotal = annualTotal/12;
    //console.log(monthlyTotal);//test to make sure number value calculated
    return monthlyTotal;
}//end calcMonthlySal

function addToDOM() {
    $('#employee-table-body').empty();
    for (let employee of employeeArray) {
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
    $('#salary-month-total').empty();
    let monthlyCost = calcMonthlySal();
    $('#salary-month-total').append(monthlyCost);
}//end addToDOM

function removeEmployee() {
    //function code here
}//end removeEmployee



/**
 * The plan - Basic, w/o checks:
 * To make tracking monthly salary easier, will store employees+data as objects in array (instead of a count/tally)
 * Step1: create empty array
 * step2: create onclick function - clicking submit button triggers ghost function.
 * step3: define funct1 - takes no param. Declare var for each input field. Declare newObject with properties. Store input data in newObject. Push newObject to array. Clear input fields. Option - return newObject
 * step4: define funct2 - takes no param. Declare annualTotal var. For loop to sum annual salaries in array of objects. MAKE SURE SUMMIMNG NOT CONCAT. Declare var monthlyTotal = annualTotal/12. return monthlyTotal
 * step5: define funct3 - appends data to the DOM. Problem - if funct3 takes newObject and monthlyTotal as inputs, it can easily add new row to table and update monthly total span on click, HOWEVER hitting delete button will clear row and leave space empty.
 *      **funct 3 - takes monthlyTotal as input (maybe). First, clears #employee-table-body. for loop - for each object in array, appends row with required data to #employee-table-body. Appends monthlyTotal to span element and performs check. If <= 20K, green color class. If >20K, red color class.
 *      **Color change won't work - will likely need to clear div at beginning of funct3 and append h3 with text, span with class green/red, and monthlyTotal
 *      **Edit - no need to run calcMonthlySal prior to addToDOM or have addToDOM take it as input param - can just call calcMonthlySal in addToDOM
 * Step6: Row delete buttons
 *      **idea - give each delete button id == employee object id for easy targeting in array & deletion
 * Step7: create onclick function for row delete buttons - 3 param
 * Step8: define funct4 - clicking row delete button removes that employee from the array. Follow up with funct2 to recalculate monthlyTotal and funct3 to update the DOM
 */