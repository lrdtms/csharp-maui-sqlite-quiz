/* Question bank built from "C#, .NET MAUI and SQLite Study Guide".
   Types: mc (multiple choice), tf (true/false), fill (type the answer), code (read code / predict output / spot the bug).
   For mc/code the FIRST option is the correct one; the quiz shuffles them at run time. */

const TOPICS = [
  { id: 't1',  part: 'Part 1 · C#',   title: 'Your First C# Code',            blurb: 'Statements, Console.Write, errors, comments' },
  { id: 't2',  part: 'Part 1 · C#',   title: 'Literals and Variables',        blurb: 'Data types, var, suffixes, naming' },
  { id: 't3',  part: 'Part 1 · C#',   title: 'String Formatting',             blurb: 'Escapes, @ strings, interpolation, format codes' },
  { id: 't4',  part: 'Part 1 · C#',   title: 'Operations on Numbers',         blurb: 'Integer division, casting, Math, operators' },
  { id: 't5',  part: 'Part 1 · C#',   title: 'Guided Projects',               blurb: 'Student grades, weighted GPA, report output' },
  { id: 't6',  part: 'Part 2 · MAUI', title: 'Cross-Platform Apps with MAUI', blurb: 'Project files, platforms, tooling' },
  { id: 't7',  part: 'Part 2 · MAUI', title: 'Creating a UI with XAML',       blurb: 'Controls, code-behind, x:Name, x:Class' },
  { id: 't8',  part: 'Part 2 · MAUI', title: 'Layouts in XAML',               blurb: 'Stack layouts, Grid, padding vs margin' },
  { id: 't9',  part: 'Part 2 · MAUI', title: 'Data Binding',                  blurb: 'BindingContext, modes, INotifyPropertyChanged' },
  { id: 't10', part: 'Part 2 · MAUI', title: 'MVVM and ViewModels',           blurb: 'Model/View/ViewModel, commands, ObservableCollection' },
  { id: 't11', part: 'Part 2 · MAUI', title: 'Resources and Styles',          blurb: 'ResourceDictionary, scope, implicit vs explicit' },
  { id: 't12', part: 'Part 2 · MAUI', title: 'Shell Navigation',              blurb: 'TabBar, flyout, routes, GoToAsync' },
  { id: 't13', part: 'Part 2 · MAUI', title: 'SQLite in a MAUI App',          blurb: 'sqlite-net-pcl, attributes, repository pattern' },
  { id: 't14', part: 'Part 3 · SQLite', title: 'Microsoft.Data.Sqlite',       blurb: 'ADO.NET flow, parameters, readers, basic SQL' },
  { id: 't15', part: 'Review',        title: 'Glossary of Key Terms',         blurb: 'Match each term to its meaning' },
];

const QUESTIONS = [];
const r = String.raw;

function mc(t, q, right, wrong, explain, code) { QUESTIONS.push({ type: 'mc', topic: t, q, options: [right, ...wrong], explain, code }); }
function cq(t, q, right, wrong, explain, code) { QUESTIONS.push({ type: 'code', topic: t, q, options: [right, ...wrong], explain, code }); }
function tf(t, q, isTrue, explain, code) { QUESTIONS.push({ type: 'tf', topic: t, q, options: ['True', 'False'], answer: isTrue ? 0 : 1, explain, code }); }
function fill(t, q, answers, explain, code) { QUESTIONS.push({ type: 'fill', topic: t, q, answers, explain, code }); }

/* ---------- 1. Your First C# Code ---------- */
mc('t1', 'What is the only difference between Console.Write and Console.WriteLine?',
  'WriteLine moves to a new line afterwards; Write stays on the same line',
  ['Write prints numbers and WriteLine prints text', 'WriteLine prints in bold', 'Write needs a semicolon but WriteLine does not'],
  'Write prints and stays on the same line, WriteLine prints and then starts a new line, like pressing Enter.');
tf('t1', 'Almost every C# statement ends with a semicolon.', true,
  'The semicolon is like a full stop: it tells the compiler where one instruction ends and the next begins.');
fill('t1', 'The symbol that ends a C# statement is the ____ (name it or type the symbol).', ['semicolon', 'a semicolon', 'the semicolon', ';'],
  'Statements end with a semicolon.');
cq('t1', 'What does this program display?', 'Good morning (all on one line)',
  ['Good', '"Good" and "morning" on two separate lines', 'Nothing - it will not compile'],
  'Console.Write does not start a new line, so the second piece continues right after the first.',
  'Console.Write("Good ");\nConsole.Write("morning");');
mc('t1', 'In Console.WriteLine("Hello"); what is "Hello"?',
  'A string literal', ['A method', 'A class', 'A member access operator'],
  'Text in double quotes written directly in the code is a string literal. Console is the class and WriteLine the method.');
tf('t1', 'console.WriteLine("x"); (lowercase c) works exactly the same as Console.WriteLine("x");', false,
  'C# is case-sensitive. Only Console exists, so the lowercase version is an error.');
mc('t1', 'What does the C# compiler do when it finds an error in your code?',
  'Stops and shows a list of errors instead of running the program',
  ['Runs the program and skips the bad line', 'Fixes the mistake automatically', 'Runs the program and prints a warning at the end'],
  'The compiler checks everything before anything runs, which catches mistakes before a user sees them.');
mc('t1', 'You get a long list of compiler errors. What is the best approach?',
  'Fix the first error, rebuild, and check again',
  ['Fix the last error first', 'Delete the whole file', 'Ignore them and run anyway'],
  'One small mistake often creates many follow-on errors that disappear once the first is fixed.');
fill('t1', 'A single-line comment starts with ____', ['//'], 'Everything after // on that line is ignored by the compiler.');
tf('t1', 'Comments are executed by the program at run time.', false,
  'A comment is a note for humans. The compiler ignores it.');
mc('t1', 'In Console.WriteLine("Hello"); what is Console?',
  'A class (a toolbox of related tools)', ['A method', 'An argument', 'A string literal'],
  'Console is a class, WriteLine is a method (one tool inside the toolbox), and the dot means "look inside".');
fill('t1', 'WriteLine is a ____ (one tool inside the Console class).', ['method', 'a method'], 'Methods are named actions you call with parentheses.');
mc('t1', 'Which is the correct order of the journey from code to output?',
  'Write, compile, run, output', ['Compile, write, run, output', 'Write, run, compile, output', 'Run, write, compile, output'],
  'Step 2 (compile) is where syntax errors are caught.');

/* ---------- 2. Literals and Variables ---------- */
mc('t2', 'Which data type should you use for money?', 'decimal', ['float', 'double', 'char'],
  'decimal stores numbers in base 10 (about 28 digits) so values like money are exact.');
fill('t2', 'Which suffix letter makes a literal a decimal, e.g. 9.99?', ['m', 'M'], 'Write 9.99m. Without it, 9.99 is a double.');
fill('t2', 'Which suffix letter makes a literal a float, e.g. 3.14?', ['f', 'F'], 'Write 3.14f for a float.');
tf('t2', 'A char value is written with double quotes, like "A".', false,
  'char uses single quotes (\'A\'). Double quotes make a string.');
cq('t2', 'What happens with this code?', 'Compile error - count is an int, so it cannot hold text',
  ['It prints ten', 'count changes to a string', 'It compiles but crashes at run time'],
  'var is still strongly typed. The type is worked out once from the value on the right and then fixed.',
  'var count = 10;\ncount = "ten";');
mc('t2', 'What is the approximate range of an int?', 'About -2.1 billion to +2.1 billion',
  ['About -32,000 to +32,000', 'About -9 quintillion to +9 quintillion', '0 to 255'],
  'int.MaxValue is 2,147,483,647. Use long when you need bigger numbers.');
tf('t2', 'When you write var, you must give the variable a value in the same statement.', true,
  'Otherwise the compiler has nothing to work out the type from.');
mc('t2', 'Which name follows the camelCase convention?', 'totalScore', ['TotalScore', 'total_score', 'TOTALSCORE'],
  'camelCase starts lowercase and capitalises each new word: firstName, totalScore.');
mc('t2', 'What type does C# give to a number with a decimal point, such as 3.14, if you add no suffix?', 'double', ['float', 'decimal', 'int'],
  'That is why you need m (decimal) or f (float) when you want another type.');
fill('t2', 'Complete the declaration with the correct type:', ['char'], 'One character in single quotes is a char.', '____ grade = \'A\';');
mc('t2', 'What causes the error "use of unassigned local variable"?',
  'Using a variable before giving it a value', ['Using the wrong capital letters', 'Declaring it twice', 'Naming it with an underscore'],
  'You may declare first and assign later, but you must assign before you use it.');
tf('t2', 'You can declare two variables with the same name in the same scope.', false,
  'You can change a value later by assigning again, but you cannot declare the same name twice in one scope.');
mc('t2', 'Which is a valid C# variable name?', '_total', ['2ndScore', 'class', 'first-name'],
  'Names start with a letter or underscore, contain letters/digits/underscores, and cannot be keywords like class (unless prefixed with @, e.g. @class).');
mc('t2', 'Why does C# refuse to put a double into a decimal variable without being told?',
  'Information might be lost, so the compiler asks you to be explicit', ['decimal cannot store fractions', 'double values are always wrong', 'Variables cannot change type'],
  'Errors about "cannot convert" are the compiler protecting you from silently losing data.');

/* ---------- 3. String Formatting ---------- */
mc('t3', r`What does the escape sequence \t produce?`, 'A tab', ['A new line', 'A double quote', 'A backslash'], r`\t is a tab, used to line up columns.`);
fill('t3', 'Which escape sequence produces a new line? (type the characters)', [r`\n`], r`\n is a new line.`);
cq('t3', 'What is printed?', 'She said "Hi"', ['She said \\"Hi\\"', 'She said Hi', 'Compile error'],
  r`\" puts a double quote inside a string without ending the string.`,
  r`Console.WriteLine("She said \"Hi\"");`);
mc('t3', 'What does putting @ before the opening quote do?',
  'Backslashes are treated as plain characters (verbatim string)', ['Turns on string interpolation', 'Makes the string uppercase', 'Makes the string constant'],
  'A verbatim string is handy for file paths and can stretch over several lines.');
mc('t3', 'What does putting $ before the opening quote do?',
  'Lets you write variables inside {curly braces} (interpolation)', ['Turns backslashes off', 'Formats the string as currency', 'Joins two strings with +'],
  'String interpolation fills in the {slots} with variable values.');
mc('t3', r`What does Console.WriteLine($"{price:C}"); print when price is 1234.5m?`,
  '$1,234.50 (symbol depends on region settings)', ['1234.5C', '1,234.5', '123450%'],
  'C is the currency format. The symbol and separators come from the computer\'s region settings.',
  'decimal price = 1234.5m;\nConsole.WriteLine($"{price:C}");');
fill('t3', 'Which format code shows a percentage? (one letter)', ['p', 'P'], 'P is percentage: 0.25 shows 25.00% in en-US because the default number of decimals comes from the culture (P0 gives 25%).');
mc('t3', 'What does {x,-10} do inside an interpolated string?',
  'Left-aligns the value in a 10-character-wide column', ['Right-aligns the value in 10 characters', 'Shows 10 decimal places', 'Subtracts 10 from x'],
  'A positive width right-aligns; a negative width left-aligns.');
tf('t3', r`In a verbatim string @"C:\Temp\file.txt" the backslashes are printed literally.`, true,
  'The @ turns escape processing off, so you do not need double backslashes.');
fill('t3', r`A Unicode escape is \u followed by exactly how many hexadecimal digits? (number)`, ['4', 'four'], r`For example \u00A9 is the copyright sign.`);
mc('t3', 'What does the format code N2 give?', 'A number with thousands separators and 2 decimal places', ['A number with 2 digits in total', 'A percentage with 2 decimals', 'Currency with 2 symbols'],
  'C = currency, N2 = number with separators and two decimals, F1 = one fixed decimal place, P = percentage.');
mc('t3', 'A symbol shows as a question mark in the console. What usually fixes it?',
  'Console.OutputEncoding = System.Text.Encoding.UTF8;', ['Adding a semicolon', 'Using var instead of string', 'Using Console.Write instead of WriteLine'],
  'The console may not be using the right encoding for that Unicode character.');
mc('t3', 'You need variables AND literal backslashes in one string. What do you use?', '$@"..." (interpolation and verbatim together)', ['@+"..." with a plus sign', 'It is impossible in C#', 'Only Unicode escapes'],
  'You can combine both features as $@"..." (or @$"...") when you need variables and backslashes in the same string.');
mc('t3', 'How do you write one double-quote character inside a verbatim string?', 'Write two double quotes ("")', [r`Write \"`, 'Write a single quote', 'You cannot'],
  'Inside an @ string, "" gives one quote.');

/* ---------- 4. Operations on Numbers ---------- */
cq('t4', 'What is printed?', '2', ['2.33', '2.3333', '3'],
  'Both operands are int, so C# gives an int answer and throws away the fraction.',
  'int a = 7, b = 3;\nConsole.WriteLine(a / b);');
cq('t4', 'What is printed?', '1', ['2', '0', '2.33'],
  '% is the remainder operator: 3 goes into 7 twice with 1 left over.',
  'int a = 7, b = 3;\nConsole.WriteLine(a % b);');
mc('t4', 'What is the value of 3 + 4 * 2 in C#?', '11', ['14', '10', '24'],
  'Multiplication comes before addition. (3 + 4) * 2 would be 14.');
mc('t4', 'What does (int)9.99m give?', '9', ['10', '9.99', 'An error'],
  'A cast from decimal to int truncates (chops off) the decimal part. It does not round.');
cq('t4', 'What is printed?', '2', ['3', '2.5', '2.0'],
  'Math.Round rounds halves to the nearest even number by default: 2.5 becomes 2 and 3.5 becomes 4.',
  'Console.WriteLine(Math.Round(2.5));');
cq('t4', 'What is printed?', '4', ['3', '3.5', '5'],
  'A half goes to the nearest even number, so 3.5 becomes 4.',
  'Console.WriteLine(Math.Round(3.5));');
mc('t4', 'What does Math.Ceiling(3.1) return?', '4', ['3', '3.1', '3.5'], 'Ceiling always rounds up; Floor always rounds down.');
mc('t4', 'What does Math.Floor(3.9) return?', '3', ['4', '3.9', '3.5'], 'Floor always rounds down.');
mc('t4', 'How do you stop an average of two ints from losing its fraction?',
  'Cast one of the numbers to decimal (or double) before dividing', ['Use Math.Floor on the result', 'Add a semicolon', 'Use a bigger int type'],
  'Whole-number types have no room for fractions, so make at least one operand a decimal: (decimal)total / count.');
fill('t4', 'The operator that gives the remainder after division is ____ (type the symbol)', ['%'], 'n % 2 == 0 checks whether n is even.');
tf('t4', 'Casting a decimal to an int rounds the value to the nearest whole number.', false,
  'It truncates. Use Math.Round if you want rounding.');
mc('t4', 'What happens if an int calculation goes above int.MaxValue at run time?',
  'It silently wraps around to a large negative number', ['The program stops with a compile error', 'It automatically becomes a long', 'It becomes 0'],
  'int has a fixed size and overflow does not show an error by default.');
cq('t4', 'What is printed?', '5 then 6', ['6 then 6', '5 then 5', '6 then 5'],
  'x++ gives the old value first and then changes the variable. (++x would change it first.)',
  'int x = 5;\nConsole.WriteLine(x++);\nConsole.WriteLine(x);');
fill('t4', 'Complete the call so the result is 4: Math.____(16)', ['sqrt', 'Sqrt'], 'Math.Sqrt gives the square root.');
mc('t4', 'Which conversion does C# do automatically (implicit)?', 'int to decimal', ['decimal to int', 'double to int', 'double to decimal'],
  'C# only converts implicitly when the value cannot lose its size or data in a way that matters (for example int to long or int to decimal). Learn states there are no implicit conversions from double or decimal, and none between decimal and float/double, so those need an explicit cast.');
mc('t4', 'What does total += 5 mean?', 'total = total + 5', ['total = 5', 'total = total * 5', 'total = 5 - total'], 'Compound assignment does the maths and assigns in one step.');

/* ---------- 5. Guided Projects ---------- */
mc('t5', 'Why must you cast the total to decimal BEFORE dividing when averaging int scores?',
  'Otherwise int / int drops the fraction before the result is stored', ['Because decimal is faster', 'Because int cannot be divided', 'Because Console.WriteLine needs a decimal'],
  'The division is decided by the operand types, so casting the result afterwards is too late.');
cq('t5', 'What is printed?', '90', ['90.6667', '90.7', '91'],
  'Integer division happens first (272 / 3 = 90). Storing 90 in a decimal afterwards does not bring the fraction back.',
  'decimal average = (93 + 89 + 90) / 3;\nConsole.WriteLine(average);');
cq('t5', 'What is printed?', '90.7', ['90', '90.6', '91.0'],
  'The cast makes it a decimal division (90.6666...), and F1 shows exactly one decimal place, rounding to 90.7.',
  'decimal average = (decimal)(93 + 89 + 90) / 3;\nConsole.WriteLine($"{average:F1}");');
mc('t5', 'How is a GPA calculated?', 'Multiply each grade by its credits, add, then divide by total credits', ['Add the grades and divide by the number of courses', 'Multiply all grades together', 'Take the highest grade'],
  'A GPA is a weighted average: a 4-credit course counts more than a 1-credit course.');
cq('t5', 'What is the GPA (value) calculated here?', '3.6', ['3.5', '3.0', '7.0'],
  '(4.0 * 3 + 3.0 * 2) / 5 = 18 / 5 = 3.6.',
  'decimal mathPoints = 4.0m; int mathCredits = 3;\ndecimal artPoints = 3.0m; int artCredits = 2;\ndecimal gpa = (mathPoints * mathCredits + artPoints * artCredits)\n              / (mathCredits + artCredits);');
fill('t5', 'Which format code shows exactly one decimal place? (e.g. 90.7)', ['f1', 'F1'], 'F1 = fixed, one decimal place.');
mc('t5', 'What is the percentage formula from the cheat sheet?', '(decimal)score / total * 100', ['score / total * 100 with ints', 'score * total / 100', 'total / score'],
  'Cast first so the division keeps its fraction, then multiply by 100.');
tf('t5', 'The guided projects introduce brand-new C# syntax that was not in chapters 1-4.', false,
  'They combine what you already know: store data, calculate, and print a tidy report.');
mc('t5', 'What is the four-step recipe behind both guided projects?', 'Store, calculate, round and format, print an aligned report',
  ['Print, store, calculate, compile', 'Compile, run, store, print', 'Calculate, print, store, comment'], 'Plan inputs, calculation and output before typing.');
mc('t5', 'In $"{name,-10}{avg,6:F1}", what happens to the name and the number?', 'Name is left-aligned; number is right-aligned with one decimal',
  ['Both are left-aligned', 'Name is right-aligned; number is left-aligned', 'Both are shown in currency'], 'Negative width = left-align, positive width = right-align, F1 = one decimal.');
mc('t5', 'What do test questions on the guided projects usually check?', 'Reading a small program and predicting its output, or spotting a bug',
  ['Memorising course code word for word', 'Drawing diagrams of the compiler', 'Installing NuGet packages'], 'So practise by changing numbers and predicting the answer before you run the code.');

/* ---------- 6. .NET MAUI ---------- */
mc('t6', 'Which platforms can a single .NET MAUI project target?', 'Android, iOS, macOS and Windows', ['Android and iOS only', 'Windows and Linux only', 'Web browsers only'],
  'One project, one shared set of controls, a native app for every platform.');
mc('t6', 'Which file creates and configures the app (fonts, services)?', 'MauiProgram.cs', ['App.xaml', 'AppShell.xaml', 'MainPage.xaml.cs'],
  'CreateMauiApp() in MauiProgram.cs builds the app and registers fonts and services.');
mc('t6', 'Where does code that is specific to one operating system go?', 'The Platforms folder', ['The Resources folder', 'MainPage.xaml', 'App.xaml'],
  'Only a small amount of platform-specific code lives in Platforms.');
mc('t6', 'Which file defines the navigation structure (tabs and flyout)?', 'AppShell.xaml', ['App.xaml', 'MauiProgram.cs', 'MainPage.xaml'], 'AppShell.xaml lists the top-level pages.');
mc('t6', 'What is App.xaml used for?', 'App-wide things such as shared styles and colours', ['Platform-specific code', 'The first page layout', 'Building the database'], 'It holds application-level resources and startup.');
tf('t6', 'Building and publishing a MAUI app for iOS from Windows requires a paired Mac build host.', true, "Apple's build tools only run on macOS, so Visual Studio pairs with a Mac. (Hot Restart in VS 2022 can deploy debug builds to a USB-connected iPhone without a Mac, but not release builds.) Run on Windows first, then test on Android and iOS.");
fill('t6', 'The method in MauiProgram.cs that builds and returns the app is ____', ['CreateMauiApp', 'CreateMauiApp()'], 'It creates a builder, registers the app class, fonts and services, and returns the finished app.');
tf('t6', 'With MAUI you need a separate project and language for each platform.', false, 'That was the problem MAUI removes: a single project, single codebase.');
mc('t6', 'On Android, what does a MAUI Button become at run time?', 'A real native Android button', ['A web page button', 'An image of a button', 'A Windows button'],
  'MAUI maps each shared control to the matching native control.');
mc('t6', 'What is MainPage.xaml.cs?', 'The code-behind (C# logic) for MainPage.xaml', ['The page layout', 'The app configuration', 'A platform setting file'], 'XAML is the look; the .xaml.cs file is the behaviour.');
mc('t6', 'Image files in Resources/Images should use what kind of names?', 'Lowercase names', ['Uppercase names', 'Names with spaces', 'Names with no extension'], 'To comply with Android rules, image filenames must be lowercase, start and end with a letter, and contain only letters, digits or underscores. Vector images (SVG) are resized per platform at build time.');
mc('t6', 'Which tooling is used to build MAUI apps in this guide?', 'Visual Studio 2022 with the .NET MAUI workload', ['Notepad and a browser', 'Only the Android Studio IDE', 'Xcode only'], 'Choose a target from the toolbar: Windows, an Android emulator or a device.');
fill('t6', 'Which element in the .csproj lists the platforms a project builds for? (name only, no angle brackets)', ['TargetFrameworks', 'targetframeworks'], 'The .csproj lists <TargetFrameworks>.');

/* ---------- 7. XAML ---------- */
mc('t7', 'How many children can a ContentPage hold?', 'One (its single Content view)', ['As many as you like', 'Two', 'None - it can only hold text'],
  'That is why you usually put a layout inside it and the controls inside the layout.');
fill('t7', 'Which attribute links a XAML page to its code-behind class? (e.g. x:____)', ['x:Class', 'Class', 'class'], 'x:Class joins the two files into one partial class.');
fill('t7', 'The constructor calls ____() to read the XAML and build the controls.', ['InitializeComponent', 'InitializeComponent()'], 'Without it, the controls are never created.');
mc('t7', 'What is x:Name used for?', 'Giving a control a name so C# code can access it', ['Setting a control\'s colour', 'Linking the page to its class', 'Adding a namespace'], 'For example x:Name="greeting" lets you write greeting.Text = "Hi";');
mc('t7', 'In <Button Text="Click me" Clicked="OnButtonClicked" />, what is OnButtonClicked?', 'The name of an event-handler method in the code-behind', ['A property of Label', 'A resource key', 'An attached property'], 'Clicked is the event; the method with that name runs when the user taps.');
tf('t7', 'In XAML, each element creates an object and each attribute sets a property.', true, 'Element = control, attribute = property.');
mc('t7', 'Which control is for multi-line text input?', 'Editor', ['Entry', 'Label', 'Switch'], 'Entry is one-line input; Label is read-only text.');
mc('t7', 'Which control is a one-line text box?', 'Entry', ['Editor', 'Label', 'Slider'], 'Read the text with entry.Text.');
mc('t7', 'Grid.Row="1" on a child is an example of what?', 'An attached property', ['An event handler', 'A resource', 'A namespace'], 'It belongs to the parent (Grid) but is set on the child.');
cq('t7', 'The user clicks the button. What happens?', 'The label text changes to "You clicked the button!"', ['Nothing - Label is read-only', 'The button text changes', 'A compile error occurs'],
  'The handler uses the x:Name to change the label from C#. (Label is read-only for the user, not for code.)',
  '// XAML: <Label x:Name="greeting" Text="Hello" />\n//       <Button Clicked="OnButtonClicked" />\nprivate void OnButtonClicked(object sender, EventArgs e)\n{\n    greeting.Text = "You clicked the button!";\n}');
tf('t7', 'A Label lets the user type text.', false, 'Label shows read-only text. Use Entry or Editor for input.');
mc('t7', 'What do the two xmlns lines at the top of a page do?', 'Tell XAML where the MAUI controls live and give access to helpers such as x:Name', ['Import images', 'Set the page title', 'Start the database'], 'They are XML namespaces.');

/* ---------- 8. Layouts ---------- */
mc('t8', 'How does a VerticalStackLayout arrange its children?', 'In a column, top to bottom', ['In a row, left to right', 'In a grid of cells', 'On top of each other at the same position'], 'HorizontalStackLayout places children in a row.');
mc('t8', 'In a Grid, what does a row height of "*" mean?', 'A share of the leftover space', ['Fit the content', 'A fixed size of 1 unit', 'Hidden'], 'Auto fits content, * takes a share of the rest, a number is fixed.');
mc('t8', 'In ColumnDefinitions="*,2*" how wide is the second column compared to the first?', 'Twice as wide', ['The same width', 'Half as wide', 'Fixed at 2 units'], '2* takes twice as much of the leftover space as *.');
mc('t8', 'What is the difference between Padding and Margin?', 'Padding is space inside a layout; Margin is space outside a control', ['Padding is outside; Margin is inside', 'They are the same', 'Padding is only for Grid'], 'Padding sits between the layout edge and its children; Margin pushes neighbours away.');
tf('t8', 'Grid rows and columns are counted starting from 1.', false, 'They count from zero.');
fill('t8', 'Which attached property makes a child cover several columns? (Grid.____)', ['ColumnSpan', 'Grid.ColumnSpan'], 'Grid.RowSpan does the same for rows.');
mc('t8', 'What does a row or column size of Auto do?', 'Sizes to fit its content', ['Takes all remaining space', 'Uses a fixed 100 units', 'Hides the row'], 'Auto = fit content.');
mc('t8', 'Which are the valid values of HorizontalOptions?', 'Start, Center, End, Fill', ['Left, Middle, Right, Stretch', 'Top, Center, Bottom, Fill', 'Small, Medium, Large'], 'They control where a control sits in the space it is given.');
mc('t8', 'What is a ScrollView for?', 'Letting content that is too tall scroll', ['Arranging items in a row', 'Applying styles', 'Navigating between pages'], 'Wrap a layout in a ScrollView when it might not fit.');
mc('t8', 'Which property sets the gap between children of a stack layout?', 'Spacing', ['Margin', 'Padding', 'Gap'], 'Spacing="10" puts a gap between children.');
mc('t8', 'Why does MAUI use device-independent units?', 'A size looks about the same on a small phone and a high-resolution tablet', ['They make the app faster to compile', 'They are required by XAML syntax', 'They make images sharper'], 'Layouts also arrange controls relatively instead of by fixed pixel positions.');
mc('t8', 'Which layout is best for a form with labels and entries in rows and columns?', 'Grid', ['HorizontalStackLayout', 'ScrollView', 'FlexLayout'], 'Grid is best for forms; stack layouts are simplest when items just follow each other.');
mc('t8', 'Which layout wraps items like text?', 'FlexLayout', ['AbsoluteLayout', 'VerticalStackLayout', 'Grid'], 'AbsoluteLayout uses exact positions.');

/* ---------- 9. Data Binding ---------- */
mc('t9', 'In a binding, which side is the target and which is the source?', 'Target = the UI control property; source = the data property', ['Target = data; source = control', 'Both are data objects', 'Both are controls'], 'Label.Text (target) is bound to Person.Name (source).');
mc('t9', 'What does Text="{Binding Name}" mean?', 'Get Text from the Name property of the BindingContext', ['Set Text to the string "Name"', 'Create a property called Name', 'Call a method called Name'], 'The source object is set in BindingContext and passed down to children.');
mc('t9', 'Without x:DataType (a classic binding), you misspell a bound property name. What happens?', 'No compile error - the control simply shows nothing', ['A compile error', 'The app crashes at startup', 'The text is shown in red'], 'Bindings are resolved while the app runs. Check the Output window when a bound value stays blank. (With compiled bindings, x:DataType, the mistake becomes a build error.)');
fill('t9', 'Which interface lets a data object tell the UI that a property changed? (name)', ['INotifyPropertyChanged'], 'It raises the PropertyChanged event inside each property setter.');
mc('t9', 'Which binding mode do input controls such as Entry.Text use by default?', 'TwoWay', ['OneWay', 'OneTime', 'OneWayToSource'], 'Most controls default to OneWay, but input controls default to TwoWay.');
mc('t9', 'What does Mode=OneTime do?', 'Sets the target from the source once (and again only if BindingContext changes)', ['Updates both directions', 'Sends data from UI to source only', 'Reads the value every second'], 'OneWay: source to UI. TwoWay: both. OneWayToSource: UI to source.');
mc('t9', 'Which mode goes only from the UI to the source?', 'OneWayToSource', ['OneWay', 'TwoWay', 'OneTime'], 'OneWay goes from source to UI.');
tf('t9', 'Classic bindings (without x:DataType) are checked at compile time, so a wrong property name gives a build error.', false, 'Classic bindings are resolved at run time. Compiled bindings (x:DataType) are checked at build time and do report errors.');
mc('t9', 'The data changed but the screen did not update. What is the most common cause?', 'The object did not raise PropertyChanged (no INotifyPropertyChanged)', ['The Label is too small', 'The page uses a Grid', 'StringFormat was used'], 'INotifyPropertyChanged is the doorbell telling the UI to look again.');
mc('t9', 'Which methods does an IValueConverter have?', 'Convert and ConvertBack', ['Read and Write', 'Get and Set', 'Bind and Unbind'], 'Convert goes source to UI; ConvertBack goes UI to source.');
fill('t9', 'The property that holds the source object for a page or control is ____', ['BindingContext'], 'It is passed down to all of the children.');
mc('t9', 'What does StringFormat=\'{0:C}\' on a binding do?', 'Formats the bound value as currency text', ['Converts the value to a bool', 'Makes the binding two-way', 'Changes the binding source'], 'For simple display formatting, StringFormat is often enough.');
mc('t9', 'What is [CallerMemberName] used for in OnPropertyChanged?', 'It fills in the calling property\'s name for you', ['It marks the primary key', 'It makes the method async', 'It creates a command'], 'So you can call OnPropertyChanged() from a setter without typing the name.');
mc('t9', 'Source={x:Reference slider} in a binding means...', 'Bind to another control instead of the BindingContext', ['Bind to a resource dictionary', 'Bind to a database row', 'Bind to the page title'], 'It lets one control bind to another, e.g. a Label to a Slider\'s Value.');

/* ---------- 10. MVVM ---------- */
mc('t10', 'What are the three parts of MVVM?', 'Model, View, ViewModel', ['Module, Variable, Method', 'Model, Viewer, Validator', 'Master, View, Variable'], 'Model = data and rules, View = XAML, ViewModel = the glue between them.');
mc('t10', 'What does the ViewModel do?', 'Exposes the data and actions the View needs; it knows nothing about controls', ['Draws the controls', 'Stores the database file', 'Defines the colours'], 'It implements INotifyPropertyChanged and exposes commands.');
mc('t10', 'Why use ObservableCollection<T> instead of List<T> for a bound list?', 'It notifies the UI when items are added or removed', ['It is faster to sort', 'It stores items in the database', 'It prevents duplicates'], 'A plain List does not raise notifications, so the bound CollectionView would not update.');
fill('t10', 'Which interface type does a ViewModel expose for button actions? (name)', ['ICommand'], 'Usually created with new Command(...).');
mc('t10', 'What does <Button Command="{Binding AddCommand}" /> do?', 'Runs the ViewModel\'s AddCommand when the button is pressed', ['Sets the button text to AddCommand', 'Adds a new Button to the page', 'Creates a Clicked event handler in code-behind'], 'In MVVM you avoid Clicked handlers in code-behind.');
mc('t10', 'How does the View find its ViewModel?', 'The page\'s BindingContext is set to a ViewModel object', ['By reading the database', 'By the x:Class attribute', 'By a Shell route'], 'BindingContext = new PeopleViewModel();');
tf('t10', 'In MVVM the View and the Model talk to each other directly.', false, 'The ViewModel sits in the middle.');
mc('t10', 'What is a key benefit of MVVM?', 'The ViewModel can be unit-tested without any UI', ['It makes apps smaller', 'It removes the need for XAML', 'It makes SQLite faster'], 'Designers can also change XAML without touching logic.');
mc('t10', 'What is the role of the Model?', 'Holds the data and business rules, e.g. a Person class', ['Displays data to the user', 'Connects the view to the data', 'Handles navigation'], 'A Person or Product class is a typical Model.');
tf('t10', 'A ViewModel should hold references to specific controls such as a Button.', false, 'It must not reference controls; it exposes properties and commands only.');
mc('t10', 'Which control shows a bound collection as a list?', 'CollectionView (ItemsSource="{Binding People}")', ['ContentPage', 'Editor', 'ScrollView only'], 'ItemsSource supplies the collection.');
cq('t10', 'What does this code-behind line do?', 'Connects the View to its ViewModel', ['Creates a database', 'Navigates to a new page', 'Defines a style'], 'Setting BindingContext lets the XAML bindings find properties and commands on the ViewModel.', 'BindingContext = new PeopleViewModel();');

/* ---------- 11. Resources and Styles ---------- */
mc('t11', 'Where does MAUI look for a resource key first?', 'The control, then its parents up to the page, then App (closest wins)', ['App, then page, then control', 'Only in App.xaml', 'Alphabetically'], 'The first match wins, so a page can override an app-wide value. If no match is found, a XamlParseException is thrown.');
mc('t11', 'What makes a style "explicit"?', 'It has an x:Key and only applies where requested', ['It has no key', 'It applies to every control', 'It is defined in C#'], 'Use Style="{StaticResource key}" to apply it.');
mc('t11', 'What makes a style "implicit"?', 'No x:Key - it applies automatically to every control of its TargetType in scope', ['It must be applied by name', 'It only works on buttons', 'It is stored in the database'], 'An implicit style applies to all controls of that type in its scope.');
mc('t11', 'How does StaticResource differ from DynamicResource?', 'Static is looked up once at load; Dynamic keeps watching for changes', ['Static can change at run time; Dynamic cannot', 'They are identical', 'Dynamic only works in App.xaml'], 'Use Static by default; Dynamic only when the value must change at run time (e.g. theme switching).');
fill('t11', 'The container that holds shared resources is a ____ (name)', ['ResourceDictionary'], 'Resources are identified by x:Key.');
fill('t11', 'Which attribute gives a resource its name? (x:____)', ['x:Key', 'Key'], 'Used to find the resource later.');
mc('t11', 'Resources defined in App.xaml are available...', 'Everywhere in the app', ['Only on the first page', 'Only in one control', 'Only in Shell'], 'Page.Resources is for one page; Control.Resources for one control.');
mc('t11', 'The same key exists in App.xaml and in a page. Which value does a control on that page use?', 'The page\'s value (closest wins)', ['The App value', 'Neither - it is an error', 'Both are merged'], 'The closest scope overrides.');
mc('t11', 'What does BasedOn do in a style?', 'Makes the style build on (inherit from) another style', ['Sets the target platform', 'Binds to data', 'Declares a colour'], 'Styles can build on each other using BasedOn.');
tf('t11', 'A StaticResource looks its key up once, when the element is created, while a DynamicResource keeps a link to the key so later changes are applied.', true, 'That is the documented difference: StaticResource performs a single dictionary lookup; DynamicResource maintains a link to the dictionary key.');
mc('t11', 'You want controls to update when the app switches themes. Which do you use?', 'DynamicResource', ['StaticResource', 'x:Name', 'BindingContext'], 'It keeps watching so the control updates.');
mc('t11', 'What does TargetType="Label" on a Style mean?', 'The style is for Label controls', ['The style can only be used once', 'The style is for one page', 'The style sets a namespace'], 'TargetType names the control type the style applies to.');

/* ---------- 12. Shell Navigation ---------- */
mc('t12', 'Which Shell element shows pages as tabs along the bottom?', 'TabBar', ['FlyoutItem', 'ShellContent', 'ScrollView'], 'FlyoutItem puts pages in the slide-out menu.');
mc('t12', 'Which Shell element puts a page in the slide-in side menu?', 'FlyoutItem', ['TabBar', 'Routing', 'ContentTemplate'], 'A flyout is a menu that slides in from the side.');
fill('t12', 'The method used to navigate is Shell.Current.____Async("route")', ['GoTo', 'GoToAsync'], 'GoToAsync moves using routes.');
mc('t12', 'What does a route starting with // mean?', 'Absolute - start from the top of the Shell', ['Relative - push a new page', 'Go back one page', 'Open a flyout'], 'An absolute route (//) navigates from the top of the Shell hierarchy. A relative route without // pushes a page registered with Routing.RegisterRoute onto the stack.');
mc('t12', 'Which route string goes back one page?', '..', ['//', '?id', 'back'], 'Use ".." to go back one page.');
mc('t12', 'When must you call Routing.RegisterRoute?', 'For pages that are not part of the tabs or flyout, such as a details page', ['For every page including tabs', 'Only for the first page', 'Only on Android'], 'Pages in the TabBar/flyout already get routes from their ShellContent.');
mc('t12', 'What does [QueryProperty(nameof(Id), "id")] do?', 'Receives a route parameter into the Id property', ['Sends a parameter to the route', 'Registers a route', 'Marks a primary key'], 'The page gets the value from the query string.');
cq('t12', 'What does this code do?', 'Navigates to DetailPage and passes id = 5', ['Goes back one page', 'Registers DetailPage', 'Opens the flyout'], 'The ?key=value part is the query string that [QueryProperty] receives.', 'await Shell.Current.GoToAsync($"{nameof(DetailPage)}?id=5");');
mc('t12', 'What is the benefit of ContentTemplate with DataTemplate?', 'Each page is created only when the user first visits it', ['Pages load faster on every visit', 'It registers a route automatically', 'It adds a flyout'], 'This keeps start-up fast.');
tf('t12', 'A relative route (no //) to a page registered with Routing.RegisterRoute pushes it onto the navigation stack.', true, 'Relative routes only work for registered pages, not pages defined in AppShell.xaml. Use ".." to go back.');
fill('t12', 'Set Shell.FlyoutBehavior="____" to turn the flyout off.', ['Disabled', 'disabled'], 'It can be turned on, off or locked.');
mc('t12', 'What is a ShellContent?', 'One page inside the Shell', ['The whole navigation bar', 'A database record', 'A style'], 'It has a Title, Route and ContentTemplate.');

/* ---------- 13. SQLite in a MAUI App ---------- */
mc('t13', 'What does the sqlite-net-pcl package let you do?', 'Treat database tables like normal C# classes', ['Write raw SQL only', 'Run a database server', 'Design XAML pages'], 'It is a small ORM used in the MAUI course.');
fill('t13', 'Which attribute marks the unique id column? ([____])', ['PrimaryKey', '[PrimaryKey]'], 'Combine with [AutoIncrement] so the database numbers new rows.');
mc('t13', 'What does [AutoIncrement] do?', 'The database assigns 1, 2, 3... to new rows itself', ['Increases the string length', 'Makes the column unique', 'Adds an index'], 'It is normally combined with [PrimaryKey].');
mc('t13', 'Where is the database file stored in a MAUI app?', 'In FileSystem.AppDataDirectory, a private folder for the app', ['In the Platforms folder', 'Next to MainPage.xaml', 'On a server'], 'The path is built once with Path.Combine(FileSystem.AppDataDirectory, "people.db3").');
mc('t13', 'What is the purpose of the repository class?', 'Wrap all database code so pages never touch SQL directly', ['Draw the UI', 'Store styles', 'Handle navigation'], 'It holds the connection and creates the table the first time it is used (Init()).');
mc('t13', 'Why are the database methods async and awaited?', 'Database work is slow; awaiting keeps the UI responsive instead of freezing it', ['To make SQL safer', 'To create tables faster', 'Because SQLite requires it'], 'All the methods end in Async.');
fill('t13', 'Which method creates the table for class Person if missing? (CreateTable____<Person>)', ['Async', 'async', 'CreateTableAsync'], 'await conn.CreateTableAsync<Person>();');
tf('t13', 'SQLite needs a separate database server to be installed.', false, 'It is a small file-based database with no server.');
mc('t13', 'What does the Init() method in the repository typically do?', 'Returns if already set up; otherwise opens the connection and creates the table', ['Deletes all rows', 'Sets the BindingContext', 'Registers routes'], 'Every method calls await Init() first.');
mc('t13', 'Which class does the guide use for the async connection in sqlite-net-pcl?', 'SQLiteAsyncConnection', ['SqliteConnection', 'DatabaseContext', 'SQLiteReader'], 'SqliteConnection (from Microsoft.Data.Sqlite) is a different class used in the ADO.NET chapter. (sqlite-net-pcl also has a synchronous SQLiteConnection; note the capital L.)');
mc('t13', 'How does UpdateAsync know which row to change?', 'It matches by primary key', ['By the first column', 'By row position', 'By the Name column'], 'So the model needs a [PrimaryKey].');
mc('t13', 'What does [MaxLength(250)] do?', 'Limits text length', ['Limits the number of rows', 'Sets a timeout', 'Sets the number of columns'], 'Other attributes: [Table], [Column], [Unique].');
mc('t13', 'In the guide, how is the repository made available to pages?', 'Registered with dependency injection in MauiProgram.cs and received in the constructor', ['It is a static global variable', 'It is set in App.xaml', 'It is created in every page'], 'builder.Services.AddSingleton(...) is used in the guide.');
tf('t13', 'You should always await database calls.', true, 'Otherwise the code may continue before the data is ready.');

/* ---------- 14. Microsoft.Data.Sqlite ---------- */
mc('t14', 'What is the correct order of the five steps of a database call?', 'Open connection, create command, set SQL + parameters, execute, read rows', ['Execute, open, create, read, set SQL', 'Create command, execute, open, read, set SQL', 'Read rows, open, create, set SQL, execute'], '1 Open the connection, 2 CreateCommand, 3 set CommandText + Parameters, 4 Execute, 5 Read the rows.');
mc('t14', 'Which method runs INSERT, UPDATE, DELETE or CREATE TABLE (statements that return no rows)?', 'ExecuteNonQuery()', ['ExecuteScalar()', 'ExecuteReader()', 'Read()'], 'It is for statements that change data or structure; for INSERT/UPDATE/DELETE it returns the number of rows affected.');
mc('t14', 'Which method should you use for SELECT COUNT(*)?', 'ExecuteScalar()', ['ExecuteNonQuery()', 'ExecuteReader()', 'Open()'], 'It returns the first column of the first row.');
mc('t14', 'Which method returns a data reader for queries that return rows?', 'ExecuteReader()', ['ExecuteNonQuery()', 'ExecuteScalar()', 'CreateCommand()'], 'Then loop with while (reader.Read()).');
mc('t14', 'What prevents SQL injection?', 'Using parameters such as $id with Parameters.AddWithValue', ['Using ExecuteScalar', 'Using using var', 'Using a bigger connection string'], 'The database treats the value as pure data, never as code.');
fill('t14', 'Which method adds a value for a placeholder? (Parameters.____)', ['AddWithValue'], 'insert.Parameters.AddWithValue("$name", "Ana");');
mc('t14', 'What does using var do for a connection, command or reader?', 'Disposes it automatically when it goes out of scope, even if an error happens', ['Makes it faster', 'Makes the variable read-only', 'Makes the SQL safe'], 'Forgetting it can leave the connection open and the database file locked.');
mc('t14', 'When does reader.Read() return false?', 'When there are no more rows', ['When the connection closes', 'When the first row is read', 'When there is an error'], 'The reader starts before the first row; each Read() moves to the next.');
mc('t14', 'What is a typical connection string for a file called school.db?', 'Data Source=school.db', ['File=school.db', 'Server=school.db', 'Open=school.db'], 'With the default Mode (ReadWriteCreate), the file is created when you open the connection if it does not exist.');
fill('t14', 'Type the command that installs the library from NuGet: dotnet add package ____', ['Microsoft.Data.Sqlite'], 'Or use NuGet Package Manager in Visual Studio.');
mc('t14', 'What is EF Core\'s relationship to Microsoft.Data.Sqlite?', 'EF Core is built on top of Microsoft.Data.Sqlite', ['Microsoft.Data.Sqlite is built on EF Core', 'They are unrelated', 'EF Core replaces SQLite'], 'sqlite-net-pcl is a separate small ORM.');
tf('t14', 'Microsoft.Data.Sqlite is an ADO.NET provider for SQLite.', true, 'ADO.NET = connection, command, reader.');
mc('t14', 'What happens if you run UPDATE or DELETE without WHERE?', 'It changes or removes every row', ['Only the first row', 'Nothing - it is an error', 'Only the last row'], 'Always add WHERE!');
mc('t14', 'Which are the main SQLite storage types?', 'INTEGER, REAL, TEXT, BLOB', ['INT, FLOAT, STRING, BOOL', 'NUMBER, CHAR, DATE, OBJECT', 'BYTE, SHORT, LONG, DOUBLE'], 'Whole, decimal, text and raw bytes.');
cq('t14', 'What is wrong with this code?', 'It builds SQL by joining user input, so it is open to SQL injection', ['Nothing is wrong', 'It uses the wrong connection string', 'It forgot Open()'], 'Use a parameter ($name) and Parameters.AddWithValue instead.', 'cmd.CommandText =\n    "SELECT * FROM student WHERE name = \'" + input + "\'";');
tf('t14', 'With a plain connection string like "Data Source=school.db", opening a file that does not exist causes an error.', false, 'The default Mode=ReadWriteCreate creates the file when you open the connection.');

/* ---------- 15. Glossary ---------- */
const GLOSSARY = [
  ['Statement', 'One complete instruction in C#; simple statements end with a semicolon.'],
  ['Compiler', 'Checks your code and turns it into instructions .NET can run; reports syntax errors.'],
  ['Literal', 'A fixed value typed in code, such as 42 or "Hello".'],
  ['Variable', 'A named place in memory that stores a value of a certain type.'],
  ['Escape sequence', 'Backslash code for a special character, such as \\n or \\t.'],
  ['String interpolation', 'Inserts variable values into text using $"...{x}...".'],
  ['Integer division', 'int / int drops the fraction (7 / 3 is 2).'],
  ['Cast', 'Explicit type conversion, such as (int)9.99m, which truncates.'],
  ['.NET MAUI', 'Framework for building Android, iOS, macOS and Windows apps from one C# project.'],
  ['XAML', 'XML-based language that describes the look of a page.'],
  ['Code-behind', 'The C# file paired with a XAML page (MainPage.xaml.cs).'],
  ['Data binding', 'Automatic link between a UI property (target) and a data property (source).'],
  ['BindingContext', 'The object that a page or control binds to.'],
  ['INotifyPropertyChanged', 'Interface that lets an object tell the UI its data changed.'],
  ['Value converter', 'An IValueConverter class that changes a value between source and UI types.'],
  ['MVVM', 'Model (data), View (XAML), ViewModel (glue with properties and commands).'],
  ['ObservableCollection', 'A list that notifies the UI when items are added or removed.'],
  ['ResourceDictionary', 'Container for shared colours, styles and converters.'],
  ['Shell', 'MAUI navigation system with flyout, tabs and route-based navigation.'],
  ['Route', 'The name used by Shell.Current.GoToAsync to reach a page.'],
  ['SQLite', 'A small, file-based database that needs no server.'],
  ['ADO.NET', 'The standard .NET set of database classes: connection, command, reader.'],
  ['SQL injection', 'Attack where user input is run as SQL; prevented with parameters.'],
  ['Padding vs Margin', 'Padding is space inside an element (between it and its content); Margin is space outside an element (between it and its neighbours).'],
  ['Implicit vs explicit style', 'Implicit has no x:Key and applies to every control of its TargetType in scope; explicit has an x:Key and is applied with Style="{StaticResource key}".'],
];
GLOSSARY.forEach(([term, def], i) => {
  const others = GLOSSARY.filter((_, j) => j !== i).map(g => g[0]);
  // deterministic pseudo-random distractors so the bank is stable
  const picks = [1, 7, 13].map(k => others[(i * 5 + k) % others.length]);
  mc('t15', 'Which term matches this meaning? "' + def + '"', term, picks, term + ': ' + def);
});
// a few fill-in glossary items
fill('t15', 'The term for a fixed value typed straight into code (like 42 or "Hello") is a ____', ['literal'], 'Literal: a fixed value typed in code.');
fill('t15', 'MVVM stands for Model-View-____', ['ViewModel', 'View Model', 'View-Model'], 'Model (data), View (XAML), ViewModel (glue).');
fill('t15', 'The small, file-based database that needs no server is ____', ['SQLite', 'sqlite'], 'SQLite keeps data in a single file on the device.');

QUESTIONS.forEach((q, i) => { q.id = i; });
