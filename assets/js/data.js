// Data of the website (vacancies, blog posts, team, reviews). Every text exists in two languages.
// "age_min" = how many minutes ago a vacancy was published, so "3 days ago" stays correct.
var DATA = {
 "categories": [
  {
   "id": 1,
   "slug": "accounting",
   "name_uk": "Бухгалтерія",
   "name_en": "Accounting",
   "icon": 0
  },
  {
   "id": 2,
   "slug": "development",
   "name_uk": "Розробка",
   "name_en": "Development",
   "icon": 1
  },
  {
   "id": 3,
   "slug": "technology",
   "name_uk": "Технології",
   "name_en": "Technology",
   "icon": 2
  },
  {
   "id": 4,
   "slug": "media",
   "name_uk": "Медіа та новини",
   "name_en": "Media & News",
   "icon": 3
  },
  {
   "id": 5,
   "slug": "medical",
   "name_uk": "Медицина",
   "name_en": "Medical",
   "icon": 4
  },
  {
   "id": 6,
   "slug": "government",
   "name_uk": "Державна служба",
   "name_en": "Government",
   "icon": 5
  },
  {
   "id": 7,
   "slug": "restaurants",
   "name_uk": "Ресторани",
   "name_en": "Restaurants",
   "icon": null
  }
 ],
 "jobs": [
  {
   "id": 1,
   "title_uk": "Дизайнер-ілюстратор",
   "title_en": "Illustration Designer",
   "company_uk": "ТОВ «Преміум Лейблз»",
   "company_en": "Premium Labels LLC",
   "description_uk": "Розробка творчих концепцій, ілюстрацій та макетів для друкованої продукції й цифрових носіїв.",
   "description_en": "Creating creative concepts, illustrations and layouts for print products and digital media.",
   "city": "kyiv",
   "city_uk": "Київ",
   "city_en": "Kyiv",
   "address_uk": "вул. Хрещатик, 22, Київ",
   "address_en": "Khreshchatyk St, 22, Kyiv",
   "job_type": "full",
   "salary_from": 15000,
   "salary_to": 25000,
   "category_id": 4,
   "tags_uk": [
    "Арт",
    "Медіа",
    "Дизайн"
   ],
   "tags_en": [
    "Art",
    "Media",
    "Design"
   ],
   "logo": "job-logo.webp",
   "featured": true,
   "rating": 3.5,
   "age_min": 1440
  },
  {
   "id": 2,
   "title_uk": "Креативний дизайнер",
   "title_en": "Creative Designer",
   "company_uk": "Креатив Студіо",
   "company_en": "Creative Studio",
   "description_uk": "Шукаємо творчого дизайнера для роботи над цікавими проєктами в дружній команді.",
   "description_en": "We are looking for a creative designer to work on exciting projects in a friendly team.",
   "city": "kharkiv",
   "city_uk": "Харків",
   "city_en": "Kharkiv",
   "address_uk": "просп. Науки, 40, Харків",
   "address_en": "Nauky Ave, 40, Kharkiv",
   "job_type": "full",
   "salary_from": 18000,
   "salary_to": 30000,
   "category_id": 4,
   "tags_uk": [
    "Дизайн",
    "Бренд"
   ],
   "tags_en": [
    "Design",
    "Brand"
   ],
   "logo": null,
   "featured": true,
   "rating": 4.2,
   "age_min": 4320
  },
  {
   "id": 3,
   "title_uk": "Бухгалтер",
   "title_en": "Accountant",
   "company_uk": "ІТ-Хаб Україна",
   "company_en": "IT Hub Ukraine",
   "description_uk": "Ведення первинної документації, нарахування зарплати, підготовка податкової звітності.",
   "description_en": "Keeping primary records, payroll and preparing tax reports.",
   "city": "vinnytsia",
   "city_uk": "Вінниця",
   "city_en": "Vinnytsia",
   "address_uk": "вул. Соборна, 33, Вінниця",
   "address_en": "Soborna St, 33, Vinnytsia",
   "job_type": "part",
   "salary_from": 8500,
   "salary_to": 13000,
   "category_id": 1,
   "tags_uk": [
    "Звітність",
    "Податки"
   ],
   "tags_en": [
    "Reporting",
    "Taxes"
   ],
   "logo": null,
   "featured": true,
   "rating": 4.9,
   "age_min": 7200
  },
  {
   "id": 4,
   "title_uk": "Головний бухгалтер",
   "title_en": "Chief Accountant",
   "company_uk": "Фінанс-Консалт",
   "company_en": "Finance Consult",
   "description_uk": "Керування бухгалтерією компанії, контроль звітності та взаємодія з податковою службою.",
   "description_en": "Managing the company accounting, controlling reports and working with tax authorities.",
   "city": "odesa",
   "city_uk": "Одеса",
   "city_en": "Odesa",
   "address_uk": "вул. Дерибасівська, 14, Одеса",
   "address_en": "Derybasivska St, 14, Odesa",
   "job_type": "intern",
   "salary_from": 12000,
   "salary_to": 18000,
   "category_id": 1,
   "tags_uk": [
    "Фінанси",
    "Керівництво"
   ],
   "tags_en": [
    "Finance",
    "Management"
   ],
   "logo": null,
   "featured": true,
   "rating": 4.1,
   "age_min": 10080
  },
  {
   "id": 5,
   "title_uk": "Frontend-розробник",
   "title_en": "Frontend Developer",
   "company_uk": "Клініка «Здоров'я»",
   "company_en": "Zdorovya Clinic",
   "description_uk": "Розробка адаптивних інтерфейсів на HTML, CSS та JavaScript. Досвід з React буде перевагою.",
   "description_en": "Building responsive interfaces with HTML, CSS and JavaScript. React experience is a plus.",
   "city": "zaporizhzhia",
   "city_uk": "Запоріжжя",
   "city_en": "Zaporizhzhia",
   "address_uk": "просп. Соборний, 120, Запоріжжя",
   "address_en": "Sobornyi Ave, 120, Zaporizhzhia",
   "job_type": "full",
   "salary_from": 35000,
   "salary_to": 60000,
   "category_id": 2,
   "tags_uk": [
    "JavaScript",
    "React",
    "CSS"
   ],
   "tags_en": [
    "JavaScript",
    "React",
    "CSS"
   ],
   "logo": null,
   "featured": false,
   "rating": 4.8,
   "age_min": 12960
  },
  {
   "id": 6,
   "title_uk": "Backend-розробник (Node.js)",
   "title_en": "Backend Developer (Node.js)",
   "company_uk": "Смак Груп",
   "company_en": "Smak Group",
   "description_uk": "Створення REST API, робота з PostgreSQL, підтримка та оптимізація існуючих сервісів.",
   "description_en": "Building REST APIs, working with PostgreSQL, supporting and optimizing existing services.",
   "city": "lviv",
   "city_uk": "Львів",
   "city_en": "Lviv",
   "address_uk": "пл. Ринок, 10, Львів",
   "address_en": "Rynok Sq, 10, Lviv",
   "job_type": "part",
   "salary_from": 24000,
   "salary_to": 42000,
   "category_id": 2,
   "tags_uk": [
    "Node.js",
    "PostgreSQL"
   ],
   "tags_en": [
    "Node.js",
    "PostgreSQL"
   ],
   "logo": null,
   "featured": false,
   "rating": 4,
   "age_min": 15840
  },
  {
   "id": 7,
   "title_uk": "QA-інженер",
   "title_en": "QA Engineer",
   "company_uk": "Медіа Центр «Новини»",
   "company_en": "News Media Center",
   "description_uk": "Тестування вебзастосунків, написання тест-кейсів, взаємодія з командою розробки.",
   "description_en": "Testing web applications, writing test cases and working with the development team.",
   "city": "dnipro",
   "city_uk": "Дніпро",
   "city_en": "Dnipro",
   "address_uk": "просп. Яворницького, 65, Дніпро",
   "address_en": "Yavornytskoho Ave, 65, Dnipro",
   "job_type": "full",
   "salary_from": 25000,
   "salary_to": 40000,
   "category_id": 3,
   "tags_uk": [
    "Тестування",
    "QA"
   ],
   "tags_en": [
    "Testing",
    "QA"
   ],
   "logo": null,
   "featured": false,
   "rating": 4.7,
   "age_min": 18720
  },
  {
   "id": 8,
   "title_uk": "Системний адміністратор",
   "title_en": "System Administrator",
   "company_uk": "ТОВ «Преміум Лейблз»",
   "company_en": "Premium Labels LLC",
   "description_uk": "Підтримка серверної інфраструктури, налаштування мережі та резервного копіювання.",
   "description_en": "Supporting server infrastructure, network setup and backups.",
   "city": "kyiv",
   "city_uk": "Київ",
   "city_en": "Kyiv",
   "address_uk": "вул. Хрещатик, 22, Київ",
   "address_en": "Khreshchatyk St, 22, Kyiv",
   "job_type": "full",
   "salary_from": 22000,
   "salary_to": 38000,
   "category_id": 3,
   "tags_uk": [
    "Linux",
    "Мережі"
   ],
   "tags_en": [
    "Linux",
    "Networks"
   ],
   "logo": "job-logo.webp",
   "featured": false,
   "rating": 3.9,
   "age_min": 21600
  },
  {
   "id": 9,
   "title_uk": "Лікар-терапевт",
   "title_en": "General Practitioner",
   "company_uk": "Креатив Студіо",
   "company_en": "Creative Studio",
   "description_uk": "Прийом пацієнтів, діагностика та призначення лікування, ведення медичної документації.",
   "description_en": "Seeing patients, diagnosis and treatment, keeping medical records.",
   "city": "kharkiv",
   "city_uk": "Харків",
   "city_en": "Kharkiv",
   "address_uk": "просп. Науки, 40, Харків",
   "address_en": "Nauky Ave, 40, Kharkiv",
   "job_type": "part",
   "salary_from": 17000,
   "salary_to": 25000,
   "category_id": 5,
   "tags_uk": [
    "Медицина",
    "Терапія"
   ],
   "tags_en": [
    "Medicine",
    "Therapy"
   ],
   "logo": null,
   "featured": false,
   "rating": 4.6,
   "age_min": 24480
  },
  {
   "id": 10,
   "title_uk": "Медична сестра",
   "title_en": "Nurse",
   "company_uk": "ІТ-Хаб Україна",
   "company_en": "IT Hub Ukraine",
   "description_uk": "Виконання лікарських призначень, догляд за пацієнтами, підготовка кабінету до прийому.",
   "description_en": "Carrying out doctor orders, patient care and preparing the office for appointments.",
   "city": "vinnytsia",
   "city_uk": "Вінниця",
   "city_en": "Vinnytsia",
   "address_uk": "вул. Соборна, 33, Вінниця",
   "address_en": "Soborna St, 33, Vinnytsia",
   "job_type": "intern",
   "salary_from": 6500,
   "salary_to": 9500,
   "category_id": 5,
   "tags_uk": [
    "Догляд",
    "Медицина"
   ],
   "tags_en": [
    "Care",
    "Medicine"
   ],
   "logo": null,
   "featured": false,
   "rating": 3.8,
   "age_min": 27360
  },
  {
   "id": 11,
   "title_uk": "Державний службовець",
   "title_en": "Civil Servant",
   "company_uk": "Фінанс-Консалт",
   "company_en": "Finance Consult",
   "description_uk": "Опрацювання звернень громадян, підготовка проєктів рішень, робота з електронним документообігом.",
   "description_en": "Handling citizen requests, preparing draft decisions and working with electronic document flow.",
   "city": "odesa",
   "city_uk": "Одеса",
   "city_en": "Odesa",
   "address_uk": "вул. Дерибасівська, 14, Одеса",
   "address_en": "Derybasivska St, 14, Odesa",
   "job_type": "full",
   "salary_from": 15000,
   "salary_to": 23000,
   "category_id": 6,
   "tags_uk": [
    "Держслужба",
    "Документообіг"
   ],
   "tags_en": [
    "Civil service",
    "Documents"
   ],
   "logo": null,
   "featured": false,
   "rating": 4.5,
   "age_min": 30240
  },
  {
   "id": 12,
   "title_uk": "Спеціаліст з документообігу",
   "title_en": "Records Specialist",
   "company_uk": "Клініка «Здоров'я»",
   "company_en": "Zdorovya Clinic",
   "description_uk": "Реєстрація вхідної та вихідної кореспонденції, контроль термінів виконання документів.",
   "description_en": "Registering incoming and outgoing mail and controlling document deadlines.",
   "city": "zaporizhzhia",
   "city_uk": "Запоріжжя",
   "city_en": "Zaporizhzhia",
   "address_uk": "просп. Соборний, 120, Запоріжжя",
   "address_en": "Sobornyi Ave, 120, Zaporizhzhia",
   "job_type": "part",
   "salary_from": 8000,
   "salary_to": 11500,
   "category_id": 6,
   "tags_uk": [
    "Архів",
    "Документи"
   ],
   "tags_en": [
    "Archive",
    "Documents"
   ],
   "logo": null,
   "featured": false,
   "rating": 3.7,
   "age_min": 33120
  },
  {
   "id": 13,
   "title_uk": "Кухар",
   "title_en": "Cook",
   "company_uk": "Смак Груп",
   "company_en": "Smak Group",
   "description_uk": "Приготування страв за технологічними картками, підтримка чистоти на робочому місці.",
   "description_en": "Cooking dishes according to recipe cards and keeping the workplace clean.",
   "city": "lviv",
   "city_uk": "Львів",
   "city_en": "Lviv",
   "address_uk": "пл. Ринок, 10, Львів",
   "address_en": "Rynok Sq, 10, Lviv",
   "job_type": "full",
   "salary_from": 17000,
   "salary_to": 26000,
   "category_id": 7,
   "tags_uk": [
    "Кухня",
    "Ресторан"
   ],
   "tags_en": [
    "Kitchen",
    "Restaurant"
   ],
   "logo": null,
   "featured": false,
   "rating": 4.4,
   "age_min": 36000
  },
  {
   "id": 14,
   "title_uk": "Адміністратор ресторану",
   "title_en": "Restaurant Manager",
   "company_uk": "Медіа Центр «Новини»",
   "company_en": "News Media Center",
   "description_uk": "Організація роботи залу, контроль якості обслуговування, робота з бронюваннями.",
   "description_en": "Organizing the dining room, controlling service quality and handling reservations.",
   "city": "dnipro",
   "city_uk": "Дніпро",
   "city_en": "Dnipro",
   "address_uk": "просп. Яворницького, 65, Дніпро",
   "address_en": "Yavornytskoho Ave, 65, Dnipro",
   "job_type": "full",
   "salary_from": 18000,
   "salary_to": 28000,
   "category_id": 7,
   "tags_uk": [
    "Сервіс",
    "Керівництво"
   ],
   "tags_en": [
    "Service",
    "Management"
   ],
   "logo": null,
   "featured": false,
   "rating": 3.6,
   "age_min": 38880
  },
  {
   "id": 15,
   "title_uk": "Журналіст",
   "title_en": "Journalist",
   "company_uk": "ТОВ «Преміум Лейблз»",
   "company_en": "Premium Labels LLC",
   "description_uk": "Підготовка новинних матеріалів та репортажів для сайту й соціальних мереж.",
   "description_en": "Preparing news articles and reports for the website and social networks.",
   "city": "kyiv",
   "city_uk": "Київ",
   "city_en": "Kyiv",
   "address_uk": "вул. Хрещатик, 22, Київ",
   "address_en": "Khreshchatyk St, 22, Kyiv",
   "job_type": "part",
   "salary_from": 9500,
   "salary_to": 16000,
   "category_id": 4,
   "tags_uk": [
    "Новини",
    "Контент"
   ],
   "tags_en": [
    "News",
    "Content"
   ],
   "logo": "job-logo.webp",
   "featured": false,
   "rating": 4.3,
   "age_min": 41760
  },
  {
   "id": 16,
   "title_uk": "SMM-менеджер",
   "title_en": "SMM Manager",
   "company_uk": "Креатив Студіо",
   "company_en": "Creative Studio",
   "description_uk": "Ведення соціальних мереж компанії, планування контенту та аналіз результатів.",
   "description_en": "Running company social networks, planning content and analysing results.",
   "city": "kharkiv",
   "city_uk": "Харків",
   "city_en": "Kharkiv",
   "address_uk": "просп. Науки, 40, Харків",
   "address_en": "Nauky Ave, 40, Kharkiv",
   "job_type": "intern",
   "salary_from": 7000,
   "salary_to": 11500,
   "category_id": 4,
   "tags_uk": [
    "SMM",
    "Маркетинг"
   ],
   "tags_en": [
    "SMM",
    "Marketing"
   ],
   "logo": null,
   "featured": false,
   "rating": 3.5,
   "age_min": 44640
  },
  {
   "id": 17,
   "title_uk": "Дизайнер-ілюстратор",
   "title_en": "Illustration Designer",
   "company_uk": "ІТ-Хаб Україна",
   "company_en": "IT Hub Ukraine",
   "description_uk": "Розробка творчих концепцій, ілюстрацій та макетів для друкованої продукції й цифрових носіїв.",
   "description_en": "Creating creative concepts, illustrations and layouts for print products and digital media.",
   "city": "vinnytsia",
   "city_uk": "Вінниця",
   "city_en": "Vinnytsia",
   "address_uk": "вул. Соборна, 33, Вінниця",
   "address_en": "Soborna St, 33, Vinnytsia",
   "job_type": "full",
   "salary_from": 15000,
   "salary_to": 25000,
   "category_id": 4,
   "tags_uk": [
    "Арт",
    "Медіа",
    "Дизайн"
   ],
   "tags_en": [
    "Art",
    "Media",
    "Design"
   ],
   "logo": null,
   "featured": false,
   "rating": 4.2,
   "age_min": 47520
  },
  {
   "id": 18,
   "title_uk": "Креативний дизайнер",
   "title_en": "Creative Designer",
   "company_uk": "Фінанс-Консалт",
   "company_en": "Finance Consult",
   "description_uk": "Шукаємо творчого дизайнера для роботи над цікавими проєктами в дружній команді.",
   "description_en": "We are looking for a creative designer to work on exciting projects in a friendly team.",
   "city": "odesa",
   "city_uk": "Одеса",
   "city_en": "Odesa",
   "address_uk": "вул. Дерибасівська, 14, Одеса",
   "address_en": "Derybasivska St, 14, Odesa",
   "job_type": "part",
   "salary_from": 11000,
   "salary_to": 18000,
   "category_id": 4,
   "tags_uk": [
    "Дизайн",
    "Бренд"
   ],
   "tags_en": [
    "Design",
    "Brand"
   ],
   "logo": null,
   "featured": false,
   "rating": 4.9,
   "age_min": 50400
  },
  {
   "id": 19,
   "title_uk": "Бухгалтер",
   "title_en": "Accountant",
   "company_uk": "Клініка «Здоров'я»",
   "company_en": "Zdorovya Clinic",
   "description_uk": "Ведення первинної документації, нарахування зарплати, підготовка податкової звітності.",
   "description_en": "Keeping primary records, payroll and preparing tax reports.",
   "city": "zaporizhzhia",
   "city_uk": "Запоріжжя",
   "city_en": "Zaporizhzhia",
   "address_uk": "просп. Соборний, 120, Запоріжжя",
   "address_en": "Sobornyi Ave, 120, Zaporizhzhia",
   "job_type": "full",
   "salary_from": 14000,
   "salary_to": 22000,
   "category_id": 1,
   "tags_uk": [
    "Звітність",
    "Податки"
   ],
   "tags_en": [
    "Reporting",
    "Taxes"
   ],
   "logo": null,
   "featured": false,
   "rating": 4.1,
   "age_min": 53280
  },
  {
   "id": 20,
   "title_uk": "Головний бухгалтер",
   "title_en": "Chief Accountant",
   "company_uk": "Смак Груп",
   "company_en": "Smak Group",
   "description_uk": "Керування бухгалтерією компанії, контроль звітності та взаємодія з податковою службою.",
   "description_en": "Managing the company accounting, controlling reports and working with tax authorities.",
   "city": "lviv",
   "city_uk": "Львів",
   "city_en": "Lviv",
   "address_uk": "пл. Ринок, 10, Львів",
   "address_en": "Rynok Sq, 10, Lviv",
   "job_type": "full",
   "salary_from": 30000,
   "salary_to": 45000,
   "category_id": 1,
   "tags_uk": [
    "Фінанси",
    "Керівництво"
   ],
   "tags_en": [
    "Finance",
    "Management"
   ],
   "logo": null,
   "featured": false,
   "rating": 4.8,
   "age_min": 56160
  },
  {
   "id": 21,
   "title_uk": "Frontend-розробник",
   "title_en": "Frontend Developer",
   "company_uk": "Медіа Центр «Новини»",
   "company_en": "News Media Center",
   "description_uk": "Розробка адаптивних інтерфейсів на HTML, CSS та JavaScript. Досвід з React буде перевагою.",
   "description_en": "Building responsive interfaces with HTML, CSS and JavaScript. React experience is a plus.",
   "city": "dnipro",
   "city_uk": "Дніпро",
   "city_en": "Dnipro",
   "address_uk": "просп. Яворницького, 65, Дніпро",
   "address_en": "Yavornytskoho Ave, 65, Dnipro",
   "job_type": "part",
   "salary_from": 21000,
   "salary_to": 36000,
   "category_id": 2,
   "tags_uk": [
    "JavaScript",
    "React",
    "CSS"
   ],
   "tags_en": [
    "JavaScript",
    "React",
    "CSS"
   ],
   "logo": null,
   "featured": false,
   "rating": 4,
   "age_min": 59040
  },
  {
   "id": 22,
   "title_uk": "Backend-розробник (Node.js)",
   "title_en": "Backend Developer (Node.js)",
   "company_uk": "ТОВ «Преміум Лейблз»",
   "company_en": "Premium Labels LLC",
   "description_uk": "Створення REST API, робота з PostgreSQL, підтримка та оптимізація існуючих сервісів.",
   "description_en": "Building REST APIs, working with PostgreSQL, supporting and optimizing existing services.",
   "city": "kyiv",
   "city_uk": "Київ",
   "city_en": "Kyiv",
   "address_uk": "вул. Хрещатик, 22, Київ",
   "address_en": "Khreshchatyk St, 22, Kyiv",
   "job_type": "intern",
   "salary_from": 16000,
   "salary_to": 28000,
   "category_id": 2,
   "tags_uk": [
    "Node.js",
    "PostgreSQL"
   ],
   "tags_en": [
    "Node.js",
    "PostgreSQL"
   ],
   "logo": "job-logo.webp",
   "featured": false,
   "rating": 4.7,
   "age_min": 61920
  },
  {
   "id": 23,
   "title_uk": "QA-інженер",
   "title_en": "QA Engineer",
   "company_uk": "Креатив Студіо",
   "company_en": "Creative Studio",
   "description_uk": "Тестування вебзастосунків, написання тест-кейсів, взаємодія з командою розробки.",
   "description_en": "Testing web applications, writing test cases and working with the development team.",
   "city": "kharkiv",
   "city_uk": "Харків",
   "city_en": "Kharkiv",
   "address_uk": "просп. Науки, 40, Харків",
   "address_en": "Nauky Ave, 40, Kharkiv",
   "job_type": "full",
   "salary_from": 25000,
   "salary_to": 40000,
   "category_id": 3,
   "tags_uk": [
    "Тестування",
    "QA"
   ],
   "tags_en": [
    "Testing",
    "QA"
   ],
   "logo": null,
   "featured": false,
   "rating": 3.9,
   "age_min": 64800
  },
  {
   "id": 24,
   "title_uk": "Системний адміністратор",
   "title_en": "System Administrator",
   "company_uk": "ІТ-Хаб Україна",
   "company_en": "IT Hub Ukraine",
   "description_uk": "Підтримка серверної інфраструктури, налаштування мережі та резервного копіювання.",
   "description_en": "Supporting server infrastructure, network setup and backups.",
   "city": "vinnytsia",
   "city_uk": "Вінниця",
   "city_en": "Vinnytsia",
   "address_uk": "вул. Соборна, 33, Вінниця",
   "address_en": "Soborna St, 33, Vinnytsia",
   "job_type": "part",
   "salary_from": 13000,
   "salary_to": 23000,
   "category_id": 3,
   "tags_uk": [
    "Linux",
    "Мережі"
   ],
   "tags_en": [
    "Linux",
    "Networks"
   ],
   "logo": null,
   "featured": false,
   "rating": 4.6,
   "age_min": 67680
  }
 ],
 "post_categories": [
  {
   "slug": "technology",
   "name_uk": "Технології",
   "name_en": "Technology"
  },
  {
   "slug": "lifestyle",
   "name_uk": "Стиль життя",
   "name_en": "Lifestyle"
  },
  {
   "slug": "fashion",
   "name_uk": "Мода",
   "name_en": "Fashion"
  },
  {
   "slug": "art",
   "name_uk": "Мистецтво",
   "name_en": "Art"
  },
  {
   "slug": "food",
   "name_uk": "Їжа",
   "name_en": "Food"
  },
  {
   "slug": "architecture",
   "name_uk": "Архітектура",
   "name_en": "Architecture"
  },
  {
   "slug": "adventure",
   "name_uk": "Подорожі",
   "name_en": "Adventure"
  }
 ],
 "posts": [
  {
   "id": 1,
   "title_uk": "Як підготувати резюме, яке помітять",
   "title_en": "How to write a résumé that gets noticed",
   "excerpt_uk": "Рекрутер переглядає резюме в середньому лише кілька секунд. Розповідаємо, як структурувати досвід, які навички винести нагору та чого точно варто уникати, щоб ваш лист не загубився серед сотень інших.",
   "excerpt_en": "A recruiter looks at a résumé for only a few seconds. We explain how to structure your experience, which skills to put first and what to avoid so your application does not get lost among hundreds of others.",
   "image": "blog-1.webp",
   "categories": [
    "art",
    "technology",
    "fashion"
   ],
   "likes": 4,
   "comments": 6,
   "age_min": 4320
  },
  {
   "id": 2,
   "title_uk": "Співбесіда без стресу: п’ять простих кроків",
   "title_en": "A stress-free interview: five simple steps",
   "excerpt_uk": "Підготовка до співбесіди починається задовго до зустрічі. Дізнайтеся, як вивчити компанію, відрепетирувати відповіді на типові запитання та поставити роботодавцю власні питання.",
   "excerpt_en": "Interview preparation starts long before the meeting. Learn how to research the company, rehearse answers to common questions and ask the employer questions of your own.",
   "image": "blog-2.webp",
   "categories": [
    "lifestyle",
    "fashion"
   ],
   "likes": 12,
   "comments": 9,
   "age_min": 14400
  },
  {
   "id": 3,
   "title_uk": "Віддалена робота: плюси, мінуси та поради",
   "title_en": "Remote work: pros, cons and tips",
   "excerpt_uk": "Робота з будь-якої точки світу дає свободу, але потребує дисципліни. Ділимося порадами, як організувати робочий простір, не втратити зв’язок із командою та уникнути вигорання.",
   "excerpt_en": "Working from anywhere gives freedom but requires discipline. We share tips on organizing your workspace, staying connected with the team and avoiding burnout.",
   "image": "blog-3.webp",
   "categories": [
    "technology",
    "adventure"
   ],
   "likes": 8,
   "comments": 3,
   "age_min": 30240
  },
  {
   "id": 4,
   "title_uk": "Кар’єра у сфері IT: з чого почати новачку",
   "title_en": "A career in IT: where a beginner should start",
   "excerpt_uk": "Світ інформаційних технологій величезний. Розбираємо популярні напрямки — від тестування до розробки, — та пояснюємо, які курси й проєкти допоможуть отримати першу роботу.",
   "excerpt_en": "The world of information technology is huge. We review popular directions, from testing to development, and explain which courses and projects help you land your first job.",
   "image": "blog-4.webp",
   "categories": [
    "technology",
    "architecture"
   ],
   "likes": 21,
   "comments": 14,
   "age_min": 50400
  },
  {
   "id": 5,
   "title_uk": "Як обрати професію, що надихає",
   "title_en": "How to choose a profession that inspires you",
   "excerpt_uk": "Вибір професії — одне з найважливіших рішень. Поговоримо про інтереси, сильні сторони та ринок праці й про те, як поєднати їх в одному напрямку.",
   "excerpt_en": "Choosing a profession is one of the most important decisions. We talk about interests, strengths and the job market, and how to combine them in one direction.",
   "image": "blog-1.webp",
   "categories": [
    "lifestyle",
    "art"
   ],
   "likes": 5,
   "comments": 2,
   "age_min": 69120
  },
  {
   "id": 6,
   "title_uk": "Переговори про зарплату: як не прогадати",
   "title_en": "Salary negotiation: how not to lose out",
   "excerpt_uk": "Більшість людей боїться говорити про гроші з роботодавцем. Пояснюємо, як оцінити свою ринкову вартість, коли починати розмову та як аргументувати бажану суму.",
   "excerpt_en": "Most people are afraid to talk about money with an employer. We explain how to assess your market value, when to start the conversation and how to justify the amount you want.",
   "image": "blog-2.webp",
   "categories": [
    "lifestyle",
    "food"
   ],
   "likes": 17,
   "comments": 11,
   "age_min": 89280
  },
  {
   "id": 7,
   "title_uk": "Робота мрії за кордоном: що потрібно знати",
   "title_en": "A dream job abroad: what you need to know",
   "excerpt_uk": "Переїзд за кордон — це не лише нова робота, а й документи, мова та адаптація. Збираємо в одному матеріалі основні етапи та поширені помилки.",
   "excerpt_en": "Moving abroad is not only a new job but also paperwork, language and adaptation. We collect the main stages and common mistakes in one article.",
   "image": "blog-3.webp",
   "categories": [
    "adventure",
    "fashion"
   ],
   "likes": 9,
   "comments": 5,
   "age_min": 115200
  },
  {
   "id": 8,
   "title_uk": "Soft skills, які цінують роботодавці",
   "title_en": "Soft skills employers value",
   "excerpt_uk": "Комунікація, командна робота та вміння навчатися часто важать не менше за технічні знання. Розповідаємо, як розвивати ці навички щодня.",
   "excerpt_en": "Communication, teamwork and the ability to learn often matter as much as technical knowledge. We explain how to develop these skills every day.",
   "image": "blog-4.webp",
   "categories": [
    "art",
    "architecture",
    "technology"
   ],
   "likes": 14,
   "comments": 7,
   "age_min": 136800
  },
  {
   "id": 9,
   "title_uk": "Як пережити звільнення й знайти нові можливості",
   "title_en": "How to get through a layoff and find new opportunities",
   "excerpt_uk": "Втрата роботи — це стрес, але також шанс переглянути свій шлях. Ділимося планом дій на перші тижні та порадами, як залишатися мотивованим.",
   "excerpt_en": "Losing a job is stressful, but it is also a chance to rethink your path. We share an action plan for the first weeks and tips on staying motivated.",
   "image": "blog-1.webp",
   "categories": [
    "lifestyle",
    "food"
   ],
   "likes": 6,
   "comments": 4,
   "age_min": 158400
  },
  {
   "id": 10,
   "title_uk": "Портфоліо дизайнера: що показати замовнику",
   "title_en": "A designer portfolio: what to show a client",
   "excerpt_uk": "Сильне портфоліо — це не десятки робіт, а кілька добре розказаних історій. Пояснюємо, як подати процес роботи та результат так, щоб замовник захотів написати вам.",
   "excerpt_en": "A strong portfolio is not dozens of works but a few well-told stories. We explain how to present the process and the result so that a client wants to contact you.",
   "image": "blog-2.webp",
   "categories": [
    "art",
    "fashion",
    "architecture"
   ],
   "likes": 19,
   "comments": 12,
   "age_min": 180000
  }
 ],
 "team": [
  {
   "id": 1,
   "name_uk": "Андрій Коваленко",
   "name_en": "Andrii Kovalenko",
   "role_uk": "Директор з продажів",
   "role_en": "Managing Director (Sales)",
   "photo": "team-1.webp"
  },
  {
   "id": 2,
   "name_uk": "Роман Бондаренко",
   "name_en": "Roman Bondarenko",
   "role_uk": "Арт-директор проєктів",
   "role_en": "Creative Art Director (Project)",
   "photo": "team-2.webp"
  },
  {
   "id": 3,
   "name_uk": "Дмитро Шевчук",
   "name_en": "Dmytro Shevchuk",
   "role_uk": "Провідний розробник",
   "role_en": "Senior Core Developer",
   "photo": "team-3.webp"
  },
  {
   "id": 4,
   "name_uk": "Лілія Мельник",
   "name_en": "Liliia Melnyk",
   "role_uk": "Контент-розробниця",
   "role_en": "Creative Content Developer",
   "photo": "team-4.webp"
  }
 ],
 "testimonials": [
  {
   "id": 1,
   "author_uk": "ТОВ «Преміум Лейблз»",
   "author_en": "Premium Labels LLC",
   "rating": 4,
   "text_uk": "Знайшли кількох талановитих дизайнерів буквально за тиждень. Платформа проста, а підбір кандидатів дуже точний.",
   "text_en": "We found several talented designers in just a week. The platform is simple and the candidate matching is very accurate.",
   "logo": "job-logo.webp"
  },
  {
   "id": 2,
   "author_uk": "Креатив Студіо",
   "author_en": "Creative Studio",
   "rating": 5,
   "text_uk": "Тепер усі вакансії студії в одному місці. Відгуки приходять швидко, а команда підтримки завжди на зв’язку.",
   "text_en": "All the studio vacancies are now in one place. Applications arrive quickly and the support team is always in touch.",
   "logo": null
  },
  {
   "id": 3,
   "author_uk": "ІТ-Хаб Україна",
   "author_en": "IT Hub Ukraine",
   "rating": 4,
   "text_uk": "Зручні фільтри та сортування допомагають швидко знайти потрібних розробників. Рекомендуємо колегам.",
   "text_en": "Convenient filters and sorting help us find the right developers fast. We recommend it to colleagues.",
   "logo": null
  },
  {
   "id": 4,
   "author_uk": "Клініка «Здоров'я»",
   "author_en": "Zdorovya Clinic",
   "rating": 3,
   "text_uk": "Закрили дві вакансії лікарів за місяць. Хотілося б ще більше можливостей для оформлення оголошень.",
   "text_en": "We filled two doctor vacancies within a month. We would like even more options for creating listings.",
   "logo": null
  }
 ]
};
