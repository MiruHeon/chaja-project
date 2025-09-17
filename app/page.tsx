"use client";

import { useState } from "react";

type LostItem = {
  id: number;
  name: string;
  description: string;
  image?: string; // 이미지 URL (미리보기)
  foundDate: string;
};

export default function Home() {
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;

    const newItem: LostItem = {
      id: Date.now(),
      name,
      description,
      image: imageFile ? URL.createObjectURL(imageFile) : undefined,
      foundDate: new Date().toISOString().split("T")[0],
    };

    setLostItems([newItem, ...lostItems]);
    setName("");
    setDescription("");
    setImageFile(null);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
      {/* Header */}
      <header style={{ padding: "1rem", backgroundColor: "#1A237E", color: "white" }}>
        <h1>차자차자 - 분실물 관리</h1>
      </header>

      {/* 분실물 등록 폼 */}
      <section style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <h2>분실물 등록</h2>
        <form
          onSubmit={handleAddItem}
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "400px" }}
        >
          <input
            type="text"
            placeholder="분실물 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "0.5rem" }}
          />
          <textarea
            placeholder="설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: "0.5rem" }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
          />
          {imageFile && <img src={URL.createObjectURL(imageFile)} alt="미리보기" width={100} />}
          <button
            type="submit"
            style={{ padding: "0.5rem", backgroundColor: "#1A237E", color: "white", border: "none", cursor: "pointer" }}
          >
            등록
          </button>
        </form>
      </section>

      {/* 분실물 목록 */}
      <main>
        <h2>분실물 목록</h2>
        {lostItems.length === 0 ? (
          <p>등록된 분실물이 없습니다.</p>
        ) : (
          lostItems.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              {item.image && <img src={item.image} alt={item.name} width={150} style={{ marginTop: "0.5rem" }} />}
              <small>발견일: {item.foundDate}</small>
            </div>
          ))
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "1rem",
          textAlign: "center",
          backgroundColor: "#1A237E",
          color: "white",
          marginTop: "2rem",
        }}
      >
        © 2025 CHAJA
      </footer>
    </div>
  );
}
