cmake_minimum_required(VERSION 3.16)
project(resume_pdf_service LANGUAGES CXX)

# 生成 compile_commands.json，便于 IDE/clangd 找到项目根下的 httplib.h、nlohmann/
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

if(MSVC)
  add_compile_options(/utf-8 /W3 /EHsc)
else()
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

add_executable(resume_pdf_service
  src/main.cpp
  src/highlight_engine.cpp
  src/resume_segments.cpp
  src/keyword_loader.cpp
)

target_include_directories(resume_pdf_service PRIVATE
  ${CMAKE_CURRENT_SOURCE_DIR}
)

# Windows + MinGW: gcc/as write intermediate .s under %TEMP%. If the path contains
# non-ASCII characters (e.g. Chinese username), as.exe may fail with
# "Illegal byte sequence". -pipe passes assembly via pipe and avoids that temp file.
if(WIN32 AND NOT MSVC AND CMAKE_CXX_COMPILER_ID STREQUAL "GNU")
  target_compile_options(resume_pdf_service PRIVATE -pipe)
endif()

if(WIN32)
  target_link_libraries(resume_pdf_service PRIVATE ws2_32)
endif()

if(UNIX AND NOT APPLE)
  target_link_libraries(resume_pdf_service PRIVATE pthread)
endif()
