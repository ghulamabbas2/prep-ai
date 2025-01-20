import { useState } from "react";

type SubmitCallback = (data: Record<string, string>) => Promise<any>;

export const useGenericSubmitHandler = (callback: SubmitCallback) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value?.toString();
    });

    try {
      await callback(data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return { handleSubmit, loading };
};
