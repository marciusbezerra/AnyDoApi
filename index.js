const Api = require('anydo-api');
require('dotenv').config();

const api = new Api(process.env.ANY_USER, process.env.ANY_PASS);

// const tasks = [
//     {title: 'from api today'},
//     {title: 'from api tomorrow', dueDate: 'tomorrow'},
//     {title: 'from api upcoming', dueDate: 'upcoming'},
//     {title: 'from api someday', dueDate: null},
//     {title: 'from api to category', categoryId: 'yourCategoryId'}
// ];

// create then delete tasks
// api.addTasks(tasks)
//     .then(() => api.sync())
//     .then(res => {
//         const titlesToFind = tasks.map(t => t.title);
//         const filteredList = res.models.task.items.filter(t => titlesToFind.includes(t.title));

//         console.log(filteredList.length);

//         filteredList.forEach(t => api.deleteTask({taskId: t.id}));
//     });

api.sync().then(res => {
    // console.log(JSON.stringify(res));
    const now = new Date(2021, 12, 31, 0, 0, 0, 0);

    const listNow = res.models.task.items.filter(t => new Date(t.dueDateUpdateTime).getTime() < now.getTime());
    const list = listNow.map(({ title, dueDateUpdateTime }) => ({ title, date: new Date(dueDateUpdateTime) }));
    list.forEach(t => console.log(t));
    // const titlesToFind = tasks.map(t => t.title);
    // const filteredList = res.models.task.items.filter(t => titlesToFind.includes(t.title));

    // console.log(filteredList.length);

    // filteredList.forEach(t => api.deleteTask({taskId: t.id}));
});
