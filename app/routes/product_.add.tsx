import { Stack } from '@chakra-ui/react';
import { redirect, type ActionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { ImplementGrid } from '~/layouts/Grid';
import { Action } from '~/modules/product/components/Action';
import { Price } from '~/modules/product/components/Price';
import { ProductDetail } from '~/modules/product/components/ProductDetail';
import { ProductInformation } from '~/modules/product/components/ProductInformation';
import { ProductManagement } from '~/modules/product/components/ProductManagement';
// import { ProductVariant } from '~/modules/product/components/ProductVariant';
import { WeightAndShipment } from '~/modules/product/components/WeightAndShipment';
import { createProduct } from '~/modules/product/product.service';


export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === 'post') {

    const formData = await request.formData();

    const imageUrl = formData.get('mainPhoto') as string;
    const imageUrl2 = formData.get('photo2') as string;
    const height = parseFloat(formData.get('height') as string);
    const description = "bro bro"
    console.log('image', imageUrl);
    console.log('image2', imageUrl2);

    const data = {
      url: imageUrl,
      url2: imageUrl2,
      name: formData.get('name'),
      description: description,
      minimumOrder: Number(formData.get('min_order')),
      price: parseFloat(formData.get('price') as string),
      stock: parseInt(formData.get('stock') as string),
      sku: formData.get('sku'),
      slug: formData.get('url'),
      category: formData.get('category') as string,
      weight: parseInt(formData.get('weight') as string),
      length: parseFloat(formData.get('length') as string),
      width: parseFloat(formData.get('width') as string),
      height: height,
    };
    await createProduct(data, '1');
    return redirect('/product');
  }
  return null;
}

export default function AddProduct() {
  return (
    <ImplementGrid>
      <Form method="post" encType="multipart/form-data">
        <Stack mt={'7.5vh'} spacing={4}>
          <ProductInformation />
          <ProductDetail />
          {/* <ProductVariant /> */}
          <Price />
          <ProductManagement />
          <WeightAndShipment />
          <Action />
        </Stack>
      </Form>
    </ImplementGrid>
  );
}
