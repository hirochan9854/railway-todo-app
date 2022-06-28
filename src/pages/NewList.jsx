import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Header } from "../components/Header";
import { useHistory } from "react-router-dom";
import { url } from "../const";
import "./newList.css";

export const NewList = () => {
  const [cookies] = useCookies();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const handleTitleChange = (e) => setTitle(e.target.value);
  const onCreateList = () => {
    const data = {
      title: title
    }

    axios.post(`${url}/lists`, data, {
      headers: {
        authorization: `Bearer ${cookies.token}`
      }
    })
    .then(() => {
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div>
      <Header />
      <main className="new-list">
        <h2>リスト新規作成</h2>
        <form className="new-list-form">
          <label>タイトル</label><br />
          <input type="text" onChange={handleTitleChange} className="new-list-title" /><br />
          <button type="button" onClick={onCreateList} className="new-list-button">作成</button>
        </form>
      </main>
    </div>
  )
}