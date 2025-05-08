

function NewGeolocationPropertyForm(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition();
        console.log("Geolocation is supported by this device");
    }
    else{
        console.log("Geolocation is not supported by this device");
    }
    return(
        <>
        <div>
            <h1>Create New Property</h1>

        </div>
        </>
    )
}







export default NewGeolocationPropertyForm;