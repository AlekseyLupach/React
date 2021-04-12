export default function generateId(tasks) {
    const ids = tasks.map((task) => {
        return task.id;
    });

    if (!ids.length) {
        return 1;
    }

    const maxId = Math.max(...ids);

    return maxId + 1;
}