import React from 'react';
import { apiURI } from '../../clients/raiinmaker-api';
// import './download.css';

class DownloadFile extends React.Component {
  constructor(props: any) {
    super(props);
  }

  downloadEmployeeData = () => {
    fetch(`${apiURI}/v1/user/record`).then((response) => {
      response.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users.csv';
        a.click();
      });
      //window.location.href = response.url;
    });
  };

  render() {
    return (
      <div id="container">
        <h1>Download File using React App</h1>
        <h3>Download Employee Data using Button</h3>
        <button onClick={this.downloadEmployeeData}>Download</button>
        <p />
        <h3>Download Employee Data using Link</h3>
        <a href="#" onClick={this.downloadEmployeeData}>
          Download
        </a>
      </div>
    );
  }
}

export default DownloadFile;
