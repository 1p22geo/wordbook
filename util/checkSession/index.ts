export function checkSession(session:string){
    fetch(`${window.location.protocol}//${window.location.host}/api/check`, {
            method: "POST",
            body: JSON.stringify({
              session: session
            }),
          }).then(res=>{
            
          })
}