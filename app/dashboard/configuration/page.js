import ConfigurationMenu from "@/components/dashboard/ConfigurationMenu";

export default function ConfigurationPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Configuration</h1>
        <p className="text-muted-foreground">
          Manage your restaurant settings and configurations
        </p>
      </div>
      <ConfigurationMenu />
    </div>
  );
}