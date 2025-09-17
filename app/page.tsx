"use client";

import { useState } from "react";

type LostItem = {
  id: number;
  name: string;
  description: string;
  image?: string;
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
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#ffffff", minHeight: "100vh", padding: "1rem" }}>
      
      {/* Header */}
      <header style={{ padding: "1rem", backgroundColor: "#7DB249", color: "white", borderRadius: "8px" }}>
        <h1 style={{ margin: 0 }}>차자차자 - 분실물 관리</h1>
      </header>

      {/* 분실물 등록 폼 */}
      <section style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <h2 style={{ color: "#333" }}>분실물 등록</h2>
        <form
          onSubmit={handleAddItem}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            maxWidth: "400px",
          }}
        >
          <input
            type="text"
            placeholder="분실물 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <textarea
            placeholder="설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
          />
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="미리보기"
              width={100}
              style={{ marginTop: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
            />
          )}
          <button
            type="submit"
            style={{
              padding: "0.5rem",
              backgroundColor: "#7DB249",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            등록
          </button>
        </form>
      </section>

      {/* 분실물 목록 */}
      <main>
        <h2 style={{ color: "#333" }}>분실물 목록</h2>
        {lostItems.length === 0 ? (
          <p style={{ color: "#555" }}>등록된 분실물이 없습니다.</p>
        ) : (
          lostItems.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{item.name}</h3>
              <p style={{ margin: "0 0 0.5rem 0" }}>{item.description}</p>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  width={150}
                  style={{ marginTop: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              )}
              <small style={{ color: "#666" }}>발견일: {item.foundDate}</small>
            </div>
          ))
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "1rem",
          textAlign: "center",
          backgroundColor: "#7DB249",
          color: "white",
          borderRadius: "8px",
          marginTop: "2rem",
        }}
      >
      </footer>
    </div>
  );
}

