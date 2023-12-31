import type { ReactNode} from 'react';
import { createContext, useContext, useState } from 'react';

interface LazyContextProps {
  isLazy: boolean;
  setIsLazy: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultLazyValue: LazyContextProps = {
  isLazy: true,
  setIsLazy: () => {},
};

const LazyContext = createContext<LazyContextProps>(defaultLazyValue);

interface LazyProviderProps {
  children: ReactNode;
}

export const LazyProvider: React.FC<LazyProviderProps> = ({ children }) => {
  const [isLazy, setIsLazy] = useState(true);

  return (
    <LazyContext.Provider value={{ isLazy, setIsLazy }}>
      {children}
    </LazyContext.Provider>
  );
};

export const useLazy = (): LazyContextProps => {
  const context = useContext(LazyContext);
  if (!context) {
    throw new Error('useLazy must be used within a Lazy Provider');
  }
  return context;
};

export function useVariant() {
  // const [isLazy, setIsLazy] = useState(false);
  const { isLazy, setIsLazy } = useLazy();
  const [isColorActive, setIsColorActive] = useState(false);
  const [isSizeActive, setIsSizeActive] = useState(false);

  const toggle = () => {
    setIsLazy(!isLazy);
    setIsColorActive(false);
    setIsSizeActive(false);
  };

  //tags input shenanigans
  const [colorTags, setColorTags] = useState<string[]>([]);
  const [sizeTags, setSizeTags] = useState<string[]>([]);

  const [colorTagInput, setColorTagInput] = useState<string>('');
  const [sizeTagInput, setSizeTagInput] = useState<string>('');

  type VariantType = {
    name: string;
    active: boolean;
    price: number;
    stock: number;
    sku: string;
    weight: number;
  };

  const [colorVariants, setColorVariants] = useState<VariantType[]>([]);
  const [sizeVariants, setSizeVariants] = useState<VariantType[]>([]);

  const colorVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorInputValue = e.target.value.replace(/,/g, '');
    setColorTagInput(colorInputValue);
  };

  const sizeVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sizeInputValue = e.target.value.replace(/,/g, '');
    setSizeTagInput(sizeInputValue);
  };

  const handleColorInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === ',' && colorTagInput.trim() !== '') {
      const newVariant = {
        name: colorTagInput.trim(),
        active: true,
        price: 0,
        stock: 0,
        sku: '',
        weight: 0,
      };
      setColorVariants([...colorVariants, newVariant]);
      setColorTags([...colorTags, colorTagInput.trim()]);
      setColorTagInput('');
    }
  };

  const handleSizeInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' && sizeTagInput.trim() !== '') {
      const newVariant = {
        name: sizeTagInput.trim(),
        active: true,
        price: 0,
        stock: 0,
        sku: '',
        weight: 0,
      };
      setSizeVariants([...sizeVariants, newVariant]);
      setSizeTags([...sizeTags, sizeTagInput.trim()]);
      setSizeTagInput('');
    }
  };

  const removeColorTag = (tagToRemove: string) => {
    const updatedTags = colorTags.filter((tag) => tag !== tagToRemove);
    const updatedVariants = colorVariants.filter(
      (variant) => variant.name !== tagToRemove
    );
    setColorTags(updatedTags);
    setColorVariants(updatedVariants);
  };

  const removeSizeTag = (tagToRemove: string) => {
    const updatedTags = sizeTags.filter((tag) => tag !== tagToRemove);
    const updatedVariants = sizeVariants.filter(
      (variant) => variant.name !== tagToRemove
    );
    setSizeTags(updatedTags);
    setSizeVariants(updatedVariants);
  };

  return {
    isColorActive,
    isSizeActive,
    toggle,
    colorVariantChange,
    sizeVariantChange,
    handleColorInputKeyDown,
    handleSizeInputKeyDown,
    removeColorTag,
    removeSizeTag,
    isLazy,
    colorVariants,
    sizeVariants,
    setIsColorActive,
    setIsSizeActive,
    colorTags,
    sizeTags,
    colorTagInput,
    sizeTagInput,
  };
}
