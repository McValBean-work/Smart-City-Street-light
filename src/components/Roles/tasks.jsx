import api from "../api/axios-instance"
async function Tasks(){

    const res = await api.get("api/tasks");
    console.log(res.data);
    const AllTasks = res.data;
    return(
        <>
        {<AllTasks />}
        </>
    )
}

function TasksPage(){
    return(
        <>

        </>
    )
}

export default TasksPage;