import { addNewTask, updateTask } from './server'

// bu front end olmadan back end i test etmemizi saglayan bir fonksiyondur!!!!!!!!!!!!!!!!!

(
    async function MyFunc() {
        await addNewTask({
            name: "my task 1",
            id: "12345"
        })

        await updateTask({
            name: "my task hey Geldi",
            id: "12345"
        })
    }
)()