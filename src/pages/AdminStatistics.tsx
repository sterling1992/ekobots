import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Plus, Trash2, Save } from "lucide-react";

const AdminStatistics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<any[]>([]);
  const [editedStats, setEditedStats] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    checkAuthAndLoadStatistics();
  }, []);

  const checkAuthAndLoadStatistics = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      await loadStatistics();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    const { data } = await supabase
      .from("statistics")
      .select("*")
      .order("display_order");
    setStatistics(data || []);
  };

  const handleFieldChange = (statId: string, field: string, value: any) => {
    setEditedStats(prev => ({
      ...prev,
      [statId]: {
        ...prev[statId],
        [field]: value
      }
    }));
  };

  const handleSave = async (statId: string) => {
    const updates = editedStats[statId];
    if (!updates || Object.keys(updates).length === 0) {
      toast({
        title: "Sin cambios",
        description: "No hay cambios para guardar.",
      });
      return;
    }

    setSaving(statId);
    try {
      const { error } = await supabase
        .from("statistics")
        .update(updates)
        .eq("id", statId);

      if (error) throw error;

      setEditedStats(prev => {
        const newState = { ...prev };
        delete newState[statId];
        return newState;
      });

      toast({
        title: "✅ Guardado",
        description: "Los cambios se guardaron correctamente.",
      });
      await loadStatistics();
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

  const handleDelete = async (statId: string) => {
    if (!confirm("¿Estás seguro de eliminar esta estadística?")) return;

    try {
      const { error } = await supabase
        .from("statistics")
        .delete()
        .eq("id", statId);

      if (error) throw error;

      toast({
        title: "Eliminado",
        description: "La estadística se eliminó correctamente.",
      });
      await loadStatistics();
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
        .from("statistics")
        .insert({
          key: `stat_${Date.now()}`,
          label: "Nueva Estadística",
          value: "0",
          is_visible: true,
        });

      if (error) throw error;

      toast({
        title: "Creado",
        description: "La estadística se creó correctamente.",
      });
      await loadStatistics();
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
              <h1 className="text-2xl font-bold mt-2">Gestionar Estadísticas</h1>
            </div>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Estadística
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {statistics.map((stat) => (
            <Card key={stat.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{stat.label}</CardTitle>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(stat.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={
                      editedStats[stat.id]?.is_visible !== undefined 
                        ? editedStats[stat.id].is_visible 
                        : stat.is_visible
                    }
                    onCheckedChange={(checked) =>
                      handleFieldChange(stat.id, "is_visible", checked)
                    }
                  />
                  <Label>Visible</Label>
                </div>
                <div>
                  <Label htmlFor={`value-${stat.id}`}>Valor</Label>
                  <Input
                    id={`value-${stat.id}`}
                    value={editedStats[stat.id]?.value ?? stat.value}
                    onChange={(e) => handleFieldChange(stat.id, "value", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`label-${stat.id}`}>Etiqueta</Label>
                  <Input
                    id={`label-${stat.id}`}
                    value={editedStats[stat.id]?.label ?? stat.label}
                    onChange={(e) => handleFieldChange(stat.id, "label", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`order-${stat.id}`}>Orden</Label>
                  <Input
                    id={`order-${stat.id}`}
                    type="number"
                    value={editedStats[stat.id]?.display_order ?? stat.display_order ?? 0}
                    onChange={(e) =>
                      handleFieldChange(stat.id, "display_order", parseInt(e.target.value))
                    }
                  />
                </div>
                <Button 
                  onClick={() => handleSave(stat.id)}
                  disabled={saving === stat.id || !editedStats[stat.id]}
                  className="w-full"
                  size="lg"
                >
                  {saving === stat.id ? (
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

export default AdminStatistics;
