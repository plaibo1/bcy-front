import React from "react";
import InputMask from "react-input-mask";
import { theme } from "antd";
import { InputProps } from "antd/es/input";

interface PhoneInputProps extends Omit<InputProps, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  ...rest
}) => {
  const { token } = theme.useToken(); // Получаем стили из Ant Design Theme

  // Убираем всё, кроме цифр
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9+]/g, ""); // Оставляем только цифры и "+"

    onChange?.(rawValue);
  };

  return (
    <InputMask
      mask="+7 (999) 999 99 99"
      value={value}
      onChange={handleChange}
      maskChar=""
      onFocus={(e) => (e.target.style.borderColor = token.colorPrimary)}
      onBlur={(e) => (e.target.style.borderColor = token.colorBorder)}
    >
      {(inputProps) => (
        <input
          {...inputProps}
          {...rest}
          style={{
            width: "100%",
            height: 40,
            padding: "8px 12px",
            fontSize: token.fontSize, // Используем шрифты из темы
            lineHeight: 1.5715,
            color: token.colorText,
            backgroundColor: token.colorBgContainer,
            border: `1px solid ${token.colorBorder}`,
            borderRadius: token.borderRadius,
            transition: "all 0.2s",
            outline: "none",
            boxSizing: "border-box",
          }}
          placeholder="+7 (___) ___ __ __"
        />
      )}
    </InputMask>
  );
};
