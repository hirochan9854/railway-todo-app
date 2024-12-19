import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { url } from "../const";
import { Header } from "../components/Header";
import "./newTask.scss";
import { useNavigate } from "react-router-dom";

export const NewTask = () => {
  const [selectListId, setSelectListId] = useState();
  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleSelectList = (id) => setSelectListId(id);
  const onCreateTask = () => {
    const data = {
      title: title,
      detail: detail,
      done: false,
      limit: `${date}T${time}:00Z`,
    };

    axios
      .post(`${url}/lists/${selectListId}/tasks`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`タスクの作成に失敗しました。${err}`);
      });
  };

  useEffect(() => {
    axios
      .get(`${url}/lists`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data);
        setSelectListId(res.data[0]?.id);
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  }, []);

  // 現在の日時を取得
  const now = new Date();
  const defaultDate = now.toISOString().split("T")[0]; // yyyy-MM-dd形式
  const defaultTime = now.toTimeString().split(" ")[0].slice(0, 5); // HH:mm形式

  // 初期値を設定
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState(defaultTime);

  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);

  return (
    <div>
      <Header />
      <main className="new-task">
        <h2>タスク新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="new-task-form">
          <label>リスト</label>
          <br />
          <select
            onChange={(e) => handleSelectList(e.target.value)}
            className="new-task-select-list"
          >
            {lists.map((list, key) => (
              <option key={key} className="list-item" value={list.id}>
                {list.title}
              </option>
            ))}
          </select>
          <br />
          <label>タイトル</label>
          <br />
          <input
            type="text"
            onChange={handleTitleChange}
            className="new-task-title"
          />
          <br />
          <label>詳細</label>
          <br />
          <textarea
            type="text"
            onChange={handleDetailChange}
            className="new-task-detail"
          />
          <br />
          <div>
            <label>期限</label>
            <br />
            <label>
              日付:
              <input type="date" value={date} onChange={handleDateChange} />
            </label>
            <label>
              時刻:
              <input type="time" value={time} onChange={handleTimeChange} />
            </label>
          </div>
          <button
            type="button"
            className="new-task-button"
            onClick={onCreateTask}
          >
            作成
          </button>
        </form>
      </main>
    </div>
  );
};
