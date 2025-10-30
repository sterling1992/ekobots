import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Plus, Trash2, Save } from "lucide-react";

const AdminPrograms = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState<any[]>([]);
  const [editedPrograms, setEditedPrograms] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    checkAuthAndLoadPrograms();
  }, []);

  const checkAuthAndLoadPrograms = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      await loadPrograms();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadPrograms = async () => {
    const { data } = await supabase
      .from("programs")
      .select("*")
      .order("display_order");
    setPrograms(data || []);
  };

  const handleFieldChange = (programId: string, field: string, value: any) => {
    setEditedPrograms(prev => ({
      ...prev,
      [programId]: {
        ...prev[programId],
        [field]: value
      }
    }));
  };

  const handleSave = async (programId: string) => {
    const updates = editedPrograms[programId];
    if (!updates || Object.keys(updates).length === 0) {
      toast({
        title: "Sin cambios",
        description: "No hay cambios para guardar.",
      });
      return;
    }

    setSaving(programId);
    try {
      const { error } = await supabase
        .from("programs")
        .update(updates)
        .eq("id", programId);

      if (error) throw error;

      setEditedPrograms(prev => {
        const newState = { ...prev };
        delete newState[programId];
        return newState;
      });

      toast({
        title: "✅ Guardado",
        description: "Los cambios se guardaron correctamente.",
      });
      await loadPrograms();
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

  const handleDelete = async (programId: string) => {
    if (!confirm("¿Estás seguro de eliminar este programa?")) return;

    try {
      const { error } = await supabase
        .from("programs")
        .delete()
        .eq("id", programId);

      if (error) throw error;

      toast({
        title: "Eliminado",
        description: "El programa se eliminó correctamente.",
      });
      await loadPrograms();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleAdd = async () => {
    try {
      const { error } = await supabase
        .from("programs")
        .insert({
          title: "Nuevo Programa",
          slug: `programa-${Date.now()}`,
          description: "Descripción del programa",
          is_active: true,
        });

      if (error) throw error;

      toast({
        title: "Creado",
        description: "El programa se creó correctamente.",
      });
      await loadPrograms();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
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
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" onClick={() => navigate("/admin")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Panel
              </Button>
              <h1 className="text-2xl font-bold mt-2">Gestionar Programas</h1>
            </div>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Programa
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {programs.map((program) => (
            <Card key={program.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{program.title}</CardTitle>
                    <CardDescription>Slug: {program.slug}</CardDescription>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(program.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={
                      editedPrograms[program.id]?.is_active !== undefined 
                        ? editedPrograms[program.id].is_active 
                        : program.is_active
                    }
                    onCheckedChange={(checked) =>
                      handleFieldChange(program.id, "is_active", checked)
                    }
                  />
                  <Label>Activo</Label>
                </div>
                <div>
                  <Label htmlFor={`title-${program.id}`}>Título</Label>
                  <Input
                    id={`title-${program.id}`}
                    value={editedPrograms[program.id]?.title ?? program.title}
                    onChange={(e) => handleFieldChange(program.id, "title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`subtitle-${program.id}`}>Subtítulo</Label>
                  <Input
                    id={`subtitle-${program.id}`}
                    value={editedPrograms[program.id]?.subtitle ?? program.subtitle ?? ""}
                    onChange={(e) => handleFieldChange(program.id, "subtitle", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`description-${program.id}`}>Descripción</Label>
                  <Textarea
                    id={`description-${program.id}`}
                    value={editedPrograms[program.id]?.description ?? program.description ?? ""}
                    rows={4}
                    onChange={(e) => handleFieldChange(program.id, "description", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`color-${program.id}`}>Color</Label>
                  <Input
                    id={`color-${program.id}`}
                    type="color"
                    value={editedPrograms[program.id]?.color ?? program.color ?? "#000000"}
                    onChange={(e) => handleFieldChange(program.id, "color", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`order-${program.id}`}>Orden</Label>
                  <Input
                    id={`order-${program.id}`}
                    type="number"
                    value={editedPrograms[program.id]?.display_order ?? program.display_order ?? 0}
                    onChange={(e) =>
                      handleFieldChange(program.id, "display_order", parseInt(e.target.value))
                    }
                  />
                </div>
                <Button 
                  onClick={() => handleSave(program.id)}
                  disabled={saving === program.id || !editedPrograms[program.id]}
                  className="w-full"
                  size="lg"
                >
                  {saving === program.id ? (
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

export default AdminPrograms;
