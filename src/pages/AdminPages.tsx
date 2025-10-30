import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Save } from "lucide-react";

interface PageData {
  id: string;
  title: string;
  content: any;
  slug: string;
}

const AdminPages = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [pages, setPages] = useState<PageData[]>([]);
  const [editedPages, setEditedPages] = useState<Record<string, Partial<PageData>>>({});

  useEffect(() => {
    checkAuthAndLoadPages();
  }, []);

  const checkAuthAndLoadPages = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: pagesData } = await supabase
        .from("pages")
        .select("*")
        .order("slug");

      setPages(pagesData || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (pageId: string, field: string, value: any) => {
    setEditedPages(prev => ({
      ...prev,
      [pageId]: {
        ...prev[pageId],
        [field]: value
      }
    }));
  };

  const handleSave = async (pageId: string) => {
    const updates = editedPages[pageId];
    if (!updates || Object.keys(updates).length === 0) {
      toast({
        title: "Sin cambios",
        description: "No hay cambios para guardar.",
      });
      return;
    }

    setSaving(pageId);
    try {
      const { error } = await supabase
        .from("pages")
        .update(updates)
        .eq("id", pageId);

      if (error) throw error;

      // Update local state
      setPages(prev => prev.map(p => 
        p.id === pageId ? { ...p, ...updates } : p
      ));
      
      // Clear edited state for this page
      setEditedPages(prev => {
        const newState = { ...prev };
        delete newState[pageId];
        return newState;
      });

      toast({
        title: "✅ Guardado",
        description: "Los cambios se guardaron y ya están visibles en tu sitio.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/admin")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Panel
          </Button>
          <h1 className="text-2xl font-bold mt-2">Editar Páginas</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {pages.map((page) => (
            <Card key={page.id}>
              <CardHeader>
                <CardTitle>{page.title}</CardTitle>
                <CardDescription>Slug: {page.slug}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor={`title-${page.id}`}>Título</Label>
                  <Input
                    id={`title-${page.id}`}
                    value={editedPages[page.id]?.title ?? page.title}
                    onChange={(e) => handleFieldChange(page.id, "title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`content-${page.id}`}>Contenido (JSON)</Label>
                  <Textarea
                    id={`content-${page.id}`}
                    value={
                      editedPages[page.id]?.content 
                        ? JSON.stringify(editedPages[page.id].content, null, 2)
                        : JSON.stringify(page.content, null, 2)
                    }
                    rows={10}
                    onChange={(e) => {
                      try {
                        const content = JSON.parse(e.target.value);
                        handleFieldChange(page.id, "content", content);
                      } catch (err) {
                        // Allow invalid JSON while typing
                      }
                    }}
                  />
                </div>
                <Button 
                  onClick={() => handleSave(page.id)}
                  disabled={saving === page.id || !editedPages[page.id]}
                  className="w-full"
                >
                  {saving === page.id ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar Cambios
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminPages;
