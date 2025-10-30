import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Upload, Trash2 } from "lucide-react";

const AdminAssets = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    checkAuthAndLoadAssets();
  }, []);

  const checkAuthAndLoadAssets = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      await loadAssets();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAssets = async () => {
    const { data } = await supabase
      .from("assets")
      .select("*")
      .order("created_at", { ascending: false });
    setAssets(data || []);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("site-assets")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("site-assets")
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from("assets")
        .insert({
          key: filePath,
          url: publicUrl,
          mime_type: file.type,
          size_bytes: file.size,
        });

      if (dbError) throw dbError;

      toast({
        title: "Subido",
        description: "El archivo se subió correctamente.",
      });
      await loadAssets();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (asset: any) => {
    if (!confirm("¿Estás seguro de eliminar este archivo?")) return;

    try {
      const { error: storageError } = await supabase.storage
        .from("site-assets")
        .remove([asset.key]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("assets")
        .delete()
        .eq("id", asset.id);

      if (dbError) throw dbError;

      toast({
        title: "Eliminado",
        description: "El archivo se eliminó correctamente.",
      });
      await loadAssets();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleUpdateAlt = async (assetId: string, altText: string) => {
    try {
      const { error } = await supabase
        .from("assets")
        .update({ alt_text: altText })
        .eq("id", assetId);

      if (error) throw error;

      toast({
        title: "Guardado",
        description: "El texto alternativo se actualizó correctamente.",
      });
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
              <h1 className="text-2xl font-bold mt-2">Gestionar Archivos</h1>
            </div>
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload">
                <Button disabled={uploading} asChild>
                  <span>
                    {uploading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    Subir Archivo
                  </span>
                </Button>
              </Label>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <Card key={asset.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm truncate">{asset.key}</CardTitle>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(asset)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {asset.mime_type?.startsWith("image/") && (
                  <img
                    src={asset.url}
                    alt={asset.alt_text || "Asset"}
                    className="w-full h-48 object-cover rounded"
                  />
                )}
                <div>
                  <Label htmlFor={`alt-${asset.id}`}>Texto Alternativo</Label>
                  <Input
                    id={`alt-${asset.id}`}
                    defaultValue={asset.alt_text || ""}
                    onBlur={(e) => handleUpdateAlt(asset.id, e.target.value)}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>URL: {asset.url}</p>
                  <p>Tamaño: {(asset.size_bytes / 1024).toFixed(2)} KB</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminAssets;
