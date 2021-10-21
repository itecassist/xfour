# Employees Assessment

## Assessment

Write a NodeJs program that will do the following: You have a company of 5 employees. You need to read these employees' data into memory.

1) The program should be able to search for a name and then print the employee record details to the screen. e.g: >Type in the name of an 
   employee you would like to search for...the output should then contain a listing of the employee's details:

         name: xxx

         surname: wwww

         birth date: 01-01-2000

         employee number: 0000

         ....

2) The program must be able to accept a date, input from the keyboard, and then list the records of all employees that are older than this date.

e.g: >Type in a date (dd-MM-yyyy) to list all employees older than this date...

3) The program must be able to print out the full organizational structure of employees based on their reporting 
   relationship (using the 'reports to' attribute). e.g: >The company org. structure is:

	John Smith (Manager)
	|

	|

	--> Jane Doe (Employee)

		|

		|

	    --> Jim Bean (Employee)

	        |

	        |

	        --> Roger Wilco (Trainee)

	        |

	        |

	        --> Susan Roe (Trainee)
	....

4) The program must be able to sort and iterate through the list of employees to find the highest earning member of the 
   organization on each tier level, based on their role designation.

e.g.: >The highest earning member on each tier level is:

	Managers: John Smith - R 700,000.00

	Employees: Jim Bean - R 650,00.00

	Trainee: Susan Roe - R 250,000.00

An employee record must consist of:

- name (String)

- surname (String)

- birth date (Date)

- employee number (int)

- salary

- role designation ('Trainee', 'Employee', 'Manager')

- reports to (another employee or manager)

Notes:

- You may use any data structure for storing the employee records.

- Please initialize (read into memory) the employee record details from a text file when the program starts.

- You must make use of Object Oriented programming!! Please make use of classes, inheritance and also consider expanding on the solution by 
  adding more advanced features like the use of polymorphism.

- Please include a design document and a user manual

Feel free to use your initiative to add any extra features or use of technologies you can think of.

As a minimum, please submit the source code for assessment by providing the GitHub link to your repository.

## Feeback
Thank you for the opportunity to do this assessment. I'm not that verse in nodejs and javascript ES6. This is my first attempt at a nodejs console app. I will deffinately use nodejs in the future as it is super powerfull.


## Install
clone git repo

npm install

node index