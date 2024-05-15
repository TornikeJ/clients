# კლიენტების ცნობარი

პროექტის დაკლონვის შემდეგ ტერმინალში ვუშვებთ შემდეგ ბრძანებებს

1. npm install
2. npm run start
3. npm run server

პროექტის მიზანი გახლდათ კლიენტების ცნობარის აწყობა.
ნავიგაციაში Home, Clients და Transactions ვარიანტები გვაქვს. Home და Transactions ამ შემთხვევაში
წარმოდგენილია მაგალითების სახით, თუ როგორ შეიძლებოდა პროექტის განვითარება.

Clients გვერდზე გადასვლისას ვიხილავთ კლიენტების სიას. გვაქვს საშუალება მარტივი და დეტალური ფილტრაციის.
ძებნის ველში clientNumber პარამეტრით შეგვეძლება სიის დახარისხება. Filters ღილაკით გახნილ მოდალში შესაძლებელია 
მეტი დეტალით დახარისხება. ასევე, შესაძლებელია სიის სორტირება სვეტების მიხედვით.

**შენიშვნა**: redux-თან გამოცდილება არ მქონია, თუმცა ვცადე ამ თემის განხილვა და კლიენტების სიის ფლოუში იმპლემენტირება. 
ანგალოგიურად angular-animations-ზე, ვცადე და მოვარგე სიასა და რამდენიმე მოდალს

Add New ღილაკით გახსნილ მოდალში ვარეგისტრირებთ ახალ კლიენტს. ველების უმეტესობა სავალდებულოა და გვაქვს დამატებითი ვალიდაციებიც.
მაგალითად: Name და Surname ველებში ან ქართული ან ინგლისური ასოებით შეგვიძლია დაწერა. Phone Number-ში აუცილებლად 5-იანით უნდა დავიწყოთ ნომრის წერა
ასევე, რამდენიმე ველზე გვაქვს მინიმალური და მაქსიმალური რაოდენობის შეზღუდვა ტექსტის სიდიდეზე. არასრულფასოვნად შევსებული ინფორმაციის
შემთხვევაში შესაბამისი შენიშვნება გამოჩნდება მომხმარებლისთვის. ყველა ველის სწორად შევსების შემთხვევაში შესაძლებელი იქნება კლიენტის დამატება.

**შენიშვნა**: გამოცდილებიდან გამომდინარე clientNumber პარამეტრი ხელით შესაყვანი არ არის და ამიტომ კლიენტის დამატების დროს ვაგენერირებ
და ვაყოლებ რექუესთს, რათა მაქსიმალურად მიახლოებული ყოფილიყო რეალურ მაგალითებთან

სიის თითოელ სტრიქონს ბოლოში ახლავს 3 წერტილი, რომლის ჩამოშლის შემთვევაშიც გვაქვს 2 მოქმედების საშულება: ედიტირება ან წაშლა
წაშლის შემთხვევაში დამადასტურებელი მოდალი გაიხსნება
ედიტირების არჩევის შემთხვევაში გადავალთ კლიენტის გვერდზე

**შენიშვნა**: კლიენტის გვერდზე გადასვლისას resolver-ის ეფექტის დემონსტრაციისთვის სერვისს ჩავამატე 3 წამიანი დაყოვნება, რა დროსაც
პროგრესს ბარიც ჩანს გვერდის თავში

კლიენტის გვერდზე შეგვიძლია ყველა შევსებული ველის ედიტირება, სურათის ატვირთვა, ანგარიშების დამატება
თუკი კლიენტის რომელივე ველს შევცვლით, არ შევინახავთ ცვლილებას და ვეცდებით მაგალითად ტრანზაქციების გვერდზე გადასვლას
დამადასტურებელი მოდალი გაიხსნება, რათა შეგვახსენოს მიმდინარე ცვლილებები. (canDeactivate-ის გამოყენებით)

კლიენტის გვერდზე ანგარიშების დამატება შეგვიძლია Add New ღილაკით, რომელიც გახსნის მოდალს. ასარჩევია ანგარიშის ტიპი და ვალუტა.
შესაძლებელია რამდენიმე ვალუტაში იყოს ანგარიში, შესაბამისად შეგვიძლია რამდენიმე მნიშვნელობის არჩევა. ანგარიშის დამატების შემდეგ
გამოჩნდება ცხრილში.

**შენიშვნა**: გამოცდილებიდან გამომდინარე accountNumber პარამეტრი ხელით შესაყვანი არ არის და ამიტომ ანგარიშის დამატების დროს ვაგენერირებ
და ვაყოლებ რექუესთს. ანალოგიურად ანგარიშის სტატუსიც 'ACTIVE' სტატუსით მიჰყვება

ანგარიშების ცხრილში სტრიქონის ბოლოს 3 წერტილის ჩამოშლისას გვაქვს 2 მოქმედება: ედიტირება და დახურვა/გააქტიურება.
ედიტირების შემთხვევაში იხსნება მოდალი და შეგვიძლია დავამატოთ ვალუტა არჩეულ ანგარიშზე.
დახურვის შემთხვევაში, დავადასტურებთ ბრძანებას და შედეგად ცხრილში ინფორმაცია განახლდება, გადავა ანგარიში CLOSED სტატუსზე.
ასეთი სტატუსის მქონე ანგარიშებზე შესაძლებელია "გააქტიურების" მოქმედების გამოყენება, 3 წერტილის ჩამოშლის დროს.
