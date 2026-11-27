// Full texts of the blog posts (three short paragraphs in each language). The key is the post id.
var ARTICLES = {
 "1": {
  "uk": [
   "Рекрутер дивиться на резюме кілька секунд, тому найважливіше має бути на першому екрані: посада, якої ви прагнете, два-три ключові досягнення та контакти.",
   "Описуючи досвід, пишіть не обов’язки, а результати: що саме ви зробили і яких цифр досягли. Підлаштовуйте резюме під кожну вакансію й повторюйте слова з її опису.",
   "Уникайте довгих абзаців, помилок і зайвих деталей на кшталт хобі без зв’язку з роботою. Одна сторінка, чіткі заголовки та назва файлу з вашим прізвищем — і лист не загубиться серед сотень інших."
  ],
  "en": [
   "A recruiter looks at a résumé for a few seconds, so the most important things must be on the first screen: the position you want, two or three key achievements and your contacts.",
   "When describing experience, write results instead of duties: what exactly you did and which numbers you reached. Adapt the résumé to every vacancy and repeat words from its description.",
   "Avoid long paragraphs, mistakes and unnecessary details such as hobbies unrelated to the job. One page, clear headings and a file name with your surname will keep your application from getting lost."
  ]
 },
 "2": {
  "uk": [
   "Підготовка — найкращий засіб від хвилювання. Дізнайтеся про компанію, прочитайте опис вакансії та уявіть, які запитання можуть поставити.",
   "Потренуйте відповіді на типові запитання: розкажіть про себе, назвіть сильні й слабкі сторони, поясніть, чому обрали саме цю компанію. Відповідайте коротко й наводьте приклади.",
   "Підготуйте власні запитання до роботодавця, прийдіть трохи раніше й не бійтеся перепитати, якщо щось незрозуміло. Після розмови напишіть коротку подяку — це залишає хороше враження."
  ],
  "en": [
   "Preparation is the best cure for nerves. Learn about the company, read the job description and imagine which questions may be asked.",
   "Practise answers to typical questions: tell about yourself, name your strengths and weaknesses, explain why you chose this company. Answer briefly and give examples.",
   "Prepare your own questions for the employer, arrive a little early and do not be afraid to ask again if something is unclear. After the talk, send a short thank-you note: it leaves a good impression."
  ]
 },
 "3": {
  "uk": [
   "Віддалена робота дає свободу: не потрібно їхати в офіс, можна жити в будь-якому місті й гнучко планувати день. Багато компаній тепер наймають людей зі всієї країни.",
   "Є й мінуси: складніше відділити роботу від відпочинку, не вистачає живого спілкування, а відповідальність за власну дисципліну повністю на вас.",
   "Допоможуть чіткий розклад, окреме робоче місце, регулярні перерви та звичка повідомляти колегам про свої плани. Так віддалена робота стає зручною, а не виснажливою."
  ],
  "en": [
   "Remote work gives freedom: you do not need to travel to an office, you can live in any city and plan your day flexibly. Many companies now hire people from all over the country.",
   "There are downsides too: it is harder to separate work from rest, live communication is missing and responsibility for your own discipline is entirely yours.",
   "A clear schedule, a separate workplace, regular breaks and the habit of telling colleagues your plans will help. This way remote work becomes comfortable instead of exhausting."
  ]
 },
 "4": {
  "uk": [
   "Сфера IT велика, тому спершу оберіть напрям: розробка, тестування, дизайн інтерфейсів, аналітика чи підтримка. Попробуйте кілька безкоштовних курсів, щоб зрозуміти, що вам до вподоби.",
   "Навчайтеся на практиці. Невеликі власні проєкти, виставлені на GitHub, цінуються роботодавцями не менше за сертифікати, бо показують, що ви вмієте робити.",
   "Шукайте стажування й junior-вакансії, спілкуйтеся зі спільнотою та не соромтеся питати. Перша робота рідко буває ідеальною, але саме вона дає головний досвід."
  ],
  "en": [
   "IT is a big field, so first choose a direction: development, testing, interface design, analytics or support. Try several free courses to understand what you like.",
   "Learn by practice. Small personal projects published on GitHub are valued by employers no less than certificates, because they show what you can do.",
   "Look for internships and junior vacancies, talk to the community and do not be shy to ask. The first job is rarely perfect, but it gives the main experience."
  ]
 },
 "5": {
  "uk": [
   "Професія, що надихає, починається з розуміння себе: що вам цікаво, у чому ви сильні та які цінності для вас важливі. Запишіть три справи, під час яких ви забуваєте про час.",
   "Порівняйте свої інтереси з ринком: які спеціальності зараз потрібні та скільки вони приносять. Поговоріть з людьми, які вже працюють у цій сфері.",
   "Не бійтеся пробувати: волонтерство, практика й короткі курси допоможуть перевірити вибір без великого ризику. Змінити напрям ніколи не пізно."
  ],
  "en": [
   "A profession that inspires starts with understanding yourself: what interests you, where you are strong and which values matter to you. Write down three activities during which you forget about time.",
   "Compare your interests with the market: which specialities are needed now and how much they pay. Talk to people who already work in this field.",
   "Do not be afraid to try: volunteering, internships and short courses will help check your choice without big risk. It is never too late to change direction."
  ]
 },
 "6": {
  "uk": [
   "Розмову про зарплату варто починати з підготовки. Дізнайтеся, скільки платять за подібну роботу, і складіть список власних досягнень та користі для компанії.",
   "Називайте діапазон, а не одну цифру, і обґрунтовуйте його досвідом і результатами. Говоріть спокійно, без тиску й ультиматумів.",
   "Пам’ятайте, що зарплата — це не все: гнучкий графік, відпустка, навчання та бонуси теж мають цінність. Якщо відповідь «ні», запитайте, що потрібно для підвищення згодом."
  ],
  "en": [
   "Start a salary talk with preparation. Find out how much similar work pays and make a list of your achievements and the benefit you bring to the company.",
   "Name a range instead of one number and justify it with your experience and results. Speak calmly, without pressure or ultimatums.",
   "Remember that salary is not everything: a flexible schedule, holidays, training and bonuses also have value. If the answer is no, ask what is needed for a raise later."
  ]
 },
 "7": {
  "uk": [
   "Робота за кордоном вимагає підготовки. Перевірте візові й дозвільні вимоги країни, а також чи визнають там ваш диплом і кваліфікацію.",
   "Вивчайте мову хоча б на базовому рівні та адаптуйте резюме до місцевого формату. Шукайте вакансії на перевірених сайтах і уникайте посередників, які просять гроші наперед.",
   "Заздалегідь розрахуйте витрати на житло й життя, відкладіть фінансову подушку на перші місяці та дізнайтеся про медичне страхування."
  ],
  "en": [
   "Working abroad requires preparation. Check the visa and permit requirements of the country and whether your diploma and qualification are recognised there.",
   "Learn the language at least at a basic level and adapt your résumé to the local format. Look for vacancies on trusted sites and avoid intermediaries who ask for money in advance.",
   "Calculate housing and living costs in advance, save a financial cushion for the first months and find out about health insurance."
  ]
 },
 "8": {
  "uk": [
   "Soft skills — це уміння спілкуватися, працювати в команді, швидко вчитися та розв’язувати конфлікти. Роботодавці цінують їх нарівні з професійними знаннями.",
   "Найбільше шукають комунікабельність, відповідальність, гнучкість і навички тайм-менеджменту. На співбесіді їх перевіряють через запитання про реальні ситуації з вашого досвіду.",
   "Розвивати ці якості можна щодня: просіть відгуки в колег, беріть участь у спільних проєктах і вчіться слухати. З часом це помітять і керівники."
  ],
  "en": [
   "Soft skills are the ability to communicate, work in a team, learn quickly and solve conflicts. Employers value them equally with professional knowledge.",
   "Most in demand are sociability, responsibility, flexibility and time-management skills. At an interview they are checked with questions about real situations from your experience.",
   "These qualities can be developed every day: ask colleagues for feedback, take part in joint projects and learn to listen. With time managers will notice it too."
  ]
 },
 "9": {
  "uk": [
   "Звільнення — це складно, але воно не означає кінець кар’єри. Дозвольте собі кілька днів, щоб пережити емоції, а потім складіть план дій.",
   "Оновіть резюме, повідомте знайомим, що шукаєте роботу, і перегляньте нові вакансії. Час між роботами можна використати для курсів і нових навичок.",
   "Подбайте про бюджет і відпочинок, а також попросіть колишніх колег про рекомендації. Багато людей після такого досвіду знаходять роботу, яка їм підходить краще."
  ],
  "en": [
   "Losing a job is hard, but it is not the end of a career. Allow yourself a few days to live through the emotions and then make an action plan.",
   "Update your résumé, tell friends you are looking for work and review new vacancies. The time between jobs can be used for courses and new skills.",
   "Take care of your budget and rest, and ask former colleagues for recommendations. After such an experience many people find a job that suits them better."
  ]
 },
 "10": {
  "uk": [
   "Портфоліо — головний аргумент дизайнера. Покажіть 5–8 найкращих робіт, а не все підряд: якість важливіша за кількість.",
   "До кожного проєкту додайте короткий опис: завдання, вашу роль, процес і результат. Замовнику цікаво бачити не лише картинку, а й хід думок.",
   "Зробіть портфоліо зручним: чітка навігація, швидке завантаження та контакти на видному місці. Регулярно оновлюйте його новими роботами."
  ],
  "en": [
   "A portfolio is the main argument of a designer. Show 5–8 best works instead of everything: quality matters more than quantity.",
   "Add a short description to every project: the task, your role, the process and the result. The client wants to see not only a picture but also your line of thought.",
   "Make the portfolio convenient: clear navigation, fast loading and contacts in a visible place. Update it regularly with new works."
  ]
 }
};
