export default function Profile(){
    let user = JSON.parse(localStorage.getItem("user"));
    return (
        <>
        <div className="min-h-screen">
            <h1>Name : {user.name}</h1>
            <h1>Email : {user.email}</h1>
        </div>
        </>
    )
}