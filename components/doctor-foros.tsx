"use client";

import React, { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Pencil, Trash2, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ForumPost = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
  dislikes: number;
};

export default function DoctorForo() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [userReactions, setUserReactions] = useState<{
    [postId: string]: "like" | "dislike" | null;
  }>({});
  const [content, setContent] = useState("");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");

  const doctorName = "Dr. Juan Pérez";
  const doctorAvatar = "/placeholder.svg";

  // Cargar desde localStorage
  useEffect(() => {
    const storedPosts = localStorage.getItem("forumPosts");
    const storedReactions = localStorage.getItem("userReactions");

    if (storedPosts) {
      try {
        setPosts(JSON.parse(storedPosts));
      } catch {}
    }

    if (storedReactions) {
      try {
        setUserReactions(JSON.parse(storedReactions));
      } catch {}
    }
  }, []);

  useEffect(() => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    setCurrentDateTime(`${day}/${month}/${year} ${hours}:${minutes}`);
  }, [posts]); 

  const savePosts = (updated: ForumPost[]) => {
    setPosts(updated);
    localStorage.setItem("forumPosts", JSON.stringify(updated));
  };

  const saveReactions = (updated: typeof userReactions) => {
    setUserReactions(updated);
    localStorage.setItem("userReactions", JSON.stringify(updated));
  };

  const handlePublish = () => {
    if (!content.trim()) return;

    const newPost: ForumPost = {
      id: crypto.randomUUID(),
      author: doctorName,
      avatar: doctorAvatar,
      content: content.trim(),
      time: currentDateTime,
      likes: 0,
      dislikes: 0,
    };

    const updatedPosts = [newPost, ...posts];
    savePosts(updatedPosts);
    setContent("");
  };

  const handleReaction = (id: string, type: "like" | "dislike") => {
    const current = userReactions[id] || null;

    const updatedPosts = posts.map((post) => {
      if (post.id !== id) return post;

      let likes = post.likes;
      let dislikes = post.dislikes;

      if (current === "like") likes--;
      if (current === "dislike") dislikes--;

      if (current !== type) {
        if (type === "like") likes++;
        else dislikes++;
      }

      return { ...post, likes, dislikes };
    });

    const updatedReactions = {
      ...userReactions,
      [id]: current === type ? null : type,
    };

    savePosts(updatedPosts);
    saveReactions(updatedReactions);
  };

  const handleDelete = (id: string) => {
    const updated = posts.filter((post) => post.id !== id);
    savePosts(updated);
  };

  const handleEdit = (id: string, content: string) => {
    setEditingPostId(id);
    setEditedContent(content);
  };

  const handleSaveEdit = (id: string) => {
    const updated = posts.map((post) =>
      post.id === id ? { ...post, content: editedContent } : post
    );
    savePosts(updated);
    setEditingPostId(null);
    setEditedContent("");
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditedContent("");
  };

  return (
  <div className="h-[calc(100vh-5rem)] flex flex-col gap-6">
    <h1 className="text-3xl font-bold">Foro del Doctor</h1>

    {/* Header general con doctor */}
    <Card className="mb-4">
      <CardHeader className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={doctorAvatar} alt={doctorName} />
          <AvatarFallback>{doctorName[0]}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-lg">{doctorName}</CardTitle>
      </CardHeader>
    </Card>

    {/* Formulario para crear publicaciones */}
    <Card>
      <CardHeader>
        <CardTitle>Crear Publicación</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Escriba su mensaje..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handlePublish}>Publicar</Button>
      </CardContent>
    </Card>

    <ScrollArea className="flex-1">
      <div className="space-y-4">
        {posts.map((post) => {
          const userReaction = userReactions[post.id] || null;
          return (
            <Card key={post.id}>
              <CardContent className="space-y-4">
                {editingPostId === post.id ? (
                  <>
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button onClick={() => handleSaveEdit(post.id)} size="sm">
                        <Check className="w-4 h-4 mr-1" /> Guardar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCancelEdit}
                        size="sm"
                      >
                        <X className="w-4 h-4 mr-1" /> Cancelar
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Button
                        variant={userReaction === "like" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handleReaction(post.id, "like")}
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" /> {post.likes}
                      </Button>
                      <Button
                        variant={userReaction === "dislike" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handleReaction(post.id, "dislike")}
                      >
                        <ThumbsDown className="w-4 h-4 mr-1" /> {post.dislikes}
                      </Button>
                      {post.author === doctorName && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(post.id, post.content)}
                          >
                            <Pencil className="w-4 h-4 mr-1" /> Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Borrar
                          </Button>
                        </>
                      )}
                      <span className="ml-auto text-xs">{post.time}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  </div>
);

}
