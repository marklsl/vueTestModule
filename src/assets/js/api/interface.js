import axios from 'axios'

//get请求
export function testGet() {
  // return axios.get(url81 + `/plan/one?id=${id}`)//get请求
}
//post请求
export function testPost() {
  // return axios.post(url81 + '/plan/upd',param)//post请求
}
//文件流请求
export function testFile() {
  // let formData = new FormData();
  // formData.append("filename", "my-file");  // 文件名
  // formData.append("operation","upload_file")
  // formData.append("file", file);//file是blob文件
  // formData.append("angle1","0");
  // return axios.post(url81 + '/tmc/upd', param, {headers: {"Content-Type": "multipart/form-data"}});//fromdate
}
export function getData() {
  return axios.get( `/user/aaa`)//get请求
}

