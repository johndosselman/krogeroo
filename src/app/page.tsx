import styles from "./page.module.css";

async function getData() {
  const res = await fetch("https://localhost:8000").then((x) => x.json());
  return res.status;
}

export default async function Home() {
  const data = await getData();

  return (
    <div>
      <h1>Hello</h1>
      <h2>{data}</h2>
    </div>
  );
}
