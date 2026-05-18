interface EmptyStateProps {
  title: string;
  message: string;
  action?: React.ReactNode;
}

export default function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
