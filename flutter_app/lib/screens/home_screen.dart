import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  final Map<String, dynamic> user;
  const HomeScreen({super.key, required this.user});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Welcome")),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.check_circle, color: Color.fromARGB(255, 18, 188, 206), size: 80),
              const SizedBox(height: 20),
              const Text(
                "Login Successful!",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              Text("Name: ${user['name']}", style: const TextStyle(fontSize: 18)),
              Text("Email: ${user['email']}", style: const TextStyle(fontSize: 18)),
            ],
          ),
        ),
      ),
    );
  }
}