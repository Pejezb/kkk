"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThumbsUp, ThumbsDown } from "lucide-react";

type ForumPost = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
  dislikes: number;
};

export default function PacienteForo() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [userReactions, setUserReactions] = useState<{
    [postId: string]: "like" | "dislike" | null;
  }>({});

  useEffect(() => {
    // ✅ Cargar publicaciones
    const storedPosts = localStorage.getItem("forumPosts");
    if (storedPosts) {
      try {
        const parsed = JSON.parse(storedPosts);
        if (Array.isArray(parsed)) {
          setPosts(parsed);
        }
      } catch (error) {
        console.error("Error al parsear forumPosts:", error);
      }
    }

    // ✅ Cargar reacciones
    const storedReactions = localStorage.getItem("userReactions");
    if (storedReactions) {
      try {
        setUserReactions(JSON.parse(storedReactions));
        console.log("✅ Reacciones cargadas:", storedReactions);
      } catch (error) {
        console.error("❌ Error al leer userReactions:", error);
        localStorage.removeItem("userReactions");
      }
    }
  }, []);

  // ✅ Guardar reacciones
  const saveReactions = (updated: typeof userReactions) => {
    setUserReactions(updated);
    localStorage.setItem("userReactions", JSON.stringify(updated));
  };

  // ✅ Reaccionar
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
        if (type === "dislike") dislikes++;
      }

      return { ...post, likes, dislikes };
    });

    const updatedReactions = {
      ...userReactions,
      [id]: current === type ? null : type,
    };

    setPosts(updatedPosts);
    saveReactions(updatedReactions);
    localStorage.setItem("forumPosts", JSON.stringify(updatedPosts)); // ✅ sincroniza con doctor
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold mb-4">Publicaciones del Foro</h2>

      <ScrollArea className="flex-1 max-h-[400px]">
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">Aún no hay publicaciones.</p>
          ) : (
            posts.map((post) => {
              const userReaction = userReactions[post.id] || null;

              return (
                <Card key={post.id}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={post.avatar} alt={post.author} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{post.author}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {post.time}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{post.content}</p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleReaction(post.id, "like")}
                        className={`flex items-center gap-1 text-sm ${
                          userReaction === "like"
                            ? "text-green-600 font-semibold"
                            : "text-muted-foreground"
                        } hover:underline`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        {post.likes}
                      </button>
                      <button
                        onClick={() => handleReaction(post.id, "dislike")}
                        className={`flex items-center gap-1 text-sm ${
                          userReaction === "dislike"
                            ? "text-red-600 font-semibold"
                            : "text-muted-foreground"
                        } hover:underline`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                        {post.dislikes}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}