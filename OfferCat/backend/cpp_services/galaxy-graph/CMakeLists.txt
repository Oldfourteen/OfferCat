cmake_minimum_required(VERSION 3.16)
# 头文件：使用同仓库 resume-pdf 自带的 cpp-httplib 与 nlohmann/json（无需再单独下载），
# 见 target_include_directories(RESUME_PDF_DIR)。若需独立部署，可将 resume-pdf 下 httplib.h、nlohmann/ 拷到本目录 include/ 并改 include 路径。
project(galaxy_graph LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(RESUME_PDF_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../resume-pdf")

add_executable(galaxy_graph
    src/main.cpp
)

target_include_directories(galaxy_graph PRIVATE
    "${RESUME_PDF_DIR}"
)

if (WIN32)
    target_link_libraries(galaxy_graph PRIVATE ws2_32)
else()
    target_link_libraries(galaxy_graph PRIVATE pthread)
endif()
