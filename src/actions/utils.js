import { toast } from 'react-toastify';

export function errorCallingApi(err) {
  return {
    type: 'API_CALL_ERROR',
    msg: err
  };
}

export function showBusy(isBusy) {
  return {
    type: 'API_CALL_BUSY',
    isBusy: isBusy
  };
}

export function notify(type, text) {
  const position = toast.POSITION.TOP_RIGHT;
  switch (type) {
    case "success": 
      toast.success(text, { position: position } );
      break;
    case "info": 
      toast.info(text, { position: position } );
      break;
    case "error": 
      toast.error(text, { position: position } );
      break;
    case "warn": 
      toast.warn(text, { position: position } );
      break;
  }
  
}

export function createWindow(url:string, name:string='Window', width:number=800, height:number=600, left:number=0, top:number=0) {
  if (url == null) {
    return null;
  }

  var options = `width=${width},height=${height},left=${left},top=${top}`;

  // console.log("Window options: ", options);
  return window.open(url, name, options);
}

export function createTab(url:string) {
  return window.open(url, "Document", null);
}

