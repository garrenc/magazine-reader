#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Скрипт для извлечения текста и структуры из PDF
Требует: pip install PyPDF2 или pip install pdfplumber
"""

import sys
import os
import io

# Устанавливаем UTF-8 для вывода в Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

def parse_with_pypdf2():
    """Использует PyPDF2 для извлечения текста"""
    try:
        import PyPDF2
        
        # Получаем абсолютный путь к PDF файлу
        script_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(script_dir)
        pdf_path = os.path.join(project_root, 'source', 'Журнал_летний выпуск_2025_.pdf')
        
        if not os.path.exists(pdf_path):
            # Пробуем найти PDF файл в папке source
            source_dir = os.path.join(project_root, 'source')
            if os.path.exists(source_dir):
                files = os.listdir(source_dir)
                pdf_files = [f for f in files if f.endswith('.pdf')]
                if pdf_files:
                    pdf_path = os.path.join(source_dir, pdf_files[0])
                else:
                    print(f"PDF файлы не найдены в папке: {source_dir}")
                    return False
            else:
                return False
        
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            
            print(f"=== Информация о PDF ===")
            print(f"Количество страниц: {len(pdf_reader.pages)}")
            print(f"Метаданные: {pdf_reader.metadata}")
            print(f"\n=== Текст из всех страниц ===\n")
            
            full_text = ""
            for i, page in enumerate(pdf_reader.pages):
                text = page.extract_text()
                full_text += f"\n--- Страница {i + 1} ---\n{text}\n"
                print(f"--- Страница {i + 1} ---")
                print(text[:500])  # Первые 500 символов каждой страницы
                print("...\n")
            
            # Сохраняем полный текст
            output_path = os.path.join(os.path.dirname(__file__), '..', 'source', 'extracted-text.txt')
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(full_text)
            
            print(f"\n=== Полный текст сохранен в: {output_path} ===")
            return True
            
    except ImportError:
        return False
    except Exception as e:
        print(f"Ошибка при парсинге с PyPDF2: {e}")
        return False

def parse_with_pdfplumber():
    """Использует pdfplumber для более точного извлечения текста"""
    try:
        import pdfplumber
        
        # Получаем абсолютный путь к PDF файлу
        script_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(script_dir)
        pdf_path = os.path.join(project_root, 'source', 'Журнал_летний выпуск_2025_.pdf')
        
        if not os.path.exists(pdf_path):
            # Пробуем найти PDF файл в папке source
            source_dir = os.path.join(project_root, 'source')
            if os.path.exists(source_dir):
                files = os.listdir(source_dir)
                pdf_files = [f for f in files if f.endswith('.pdf')]
                if pdf_files:
                    pdf_path = os.path.join(source_dir, pdf_files[0])
                    print(f"Используется найденный файл: {pdf_path}")
                else:
                    print(f"PDF файлы не найдены в папке: {source_dir}")
                    return False
            else:
                print(f"Папка source не найдена: {source_dir}")
                return False
        
        with pdfplumber.open(pdf_path) as pdf:
            print(f"=== Информация о PDF ===")
            print(f"Количество страниц: {len(pdf.pages)}")
            print(f"Метаданные: {pdf.metadata}")
            print(f"\n=== Текст из всех страниц ===\n")
            
            full_text = ""
            for i, page in enumerate(pdf.pages):
                text = page.extract_text()
                if text:
                    full_text += f"\n--- Страница {i + 1} ---\n{text}\n"
                    print(f"--- Страница {i + 1} ---")
                    print(text[:500])
                    print("...\n")
            
            # Сохраняем полный текст
            output_path = os.path.join(project_root, 'source', 'extracted-text.txt')
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(full_text)
            
            print(f"\n=== Полный текст сохранен в: {output_path} ===")
            return True
            
    except ImportError:
        return False
    except Exception as e:
        print(f"Ошибка при парсинге с pdfplumber: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("Попытка извлечения текста из PDF...\n")
    
    # Пробуем pdfplumber (более точный)
    if parse_with_pdfplumber():
        sys.exit(0)
    
    # Пробуем PyPDF2
    if parse_with_pypdf2():
        sys.exit(0)
    
    # Если ничего не сработало
    print("\n❌ Не найдены библиотеки для работы с PDF.")
    print("Пожалуйста, установите одну из библиотек:")
    print("  pip install pdfplumber  (рекомендуется)")
    print("  или")
    print("  pip install PyPDF2")

