import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { Product, ProductFormData } from '@/types/product';

export function useProducts() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  // Fetch all products
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    }
  });

  // Add product
  const addProduct = useMutation({
    mutationFn: async (productData: ProductFormData) => {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...productData,
          price: productData.price, // already mapped in UI if needed, but let's assume UI handles kobo conversion or we do it here
          // For safety, assume UI provides price in Kobo based on the schema requirements
        }])
        .select();
      
      if (error) throw error;
      return data[0] as Product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  // Update product
  const updateProduct = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ProductFormData> & { id: string }) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data[0] as Product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  // Delete product
  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  // Bulk delete products
  const bulkDeleteProducts = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .in('id', ids);
      
      if (error) throw error;
      return ids;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  // Bulk update stock
  const bulkUpdateStock = useMutation({
    mutationFn: async ({ ids, inStock }: { ids: string[], inStock: boolean }) => {
      const { error } = await supabase
        .from('products')
        .update({ in_stock: inStock })
        .in('id', ids);
      
      if (error) throw error;
      return ids;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  // Bulk update featured
  const bulkUpdateFeatured = useMutation({
    mutationFn: async ({ ids, featured }: { ids: string[], featured: boolean }) => {
      const { error } = await supabase
        .from('products')
        .update({ featured })
        .in('id', ids);
      
      if (error) throw error;
      return ids;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  return {
    products,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    bulkDeleteProducts,
    bulkUpdateStock,
    bulkUpdateFeatured
  };
}
